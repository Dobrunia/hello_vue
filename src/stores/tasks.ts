import type { Task } from '@/types/tasks'
import { defineStore } from 'pinia'
import { tasksApi } from '@/api/tasks'

const STORAGE_KEY = 'pinia-tasks'

export const useTasksStore = defineStore('tasks', {
  state: () => {
    // Пытаемся загрузить из localStorage
    let tasks: Task[] = []
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.tasks && Array.isArray(parsed.tasks) && parsed.tasks.length > 0) {
          tasks = parsed.tasks
        }
      }
    }
    catch {
      // Игнорируем ошибки парсинга
    }

    return {
      tasks,
      loading: false,
      error: null as string | null,
    }
  },

  actions: {
    async fetchTasks() {
      // Если уже есть задачи (из localStorage), не делаем запрос
      if (this.tasks.length > 0)
        return

      this.loading = true
      this.error = null
      try {
        this.tasks = await tasksApi.getAll()
        // Сохраняем в localStorage после получения с API
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks: this.tasks }))
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch tasks'
      }
      finally {
        this.loading = false
      }
    },
    toggleTask(taskId: string) {
      this.tasks = this.tasks.map(task => task.id === taskId ? { ...task, done: !task.done } : task)
    },
  },
})
