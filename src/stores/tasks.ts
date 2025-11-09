import type { Task } from '@/types/tasks'
import { defineStore } from 'pinia'
import { tasksApi } from '@/api/tasks'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchTasks() {
      if (this.tasks.length > 0)
        return

      this.loading = true
      this.error = null
      try {
        this.tasks = await tasksApi.getAll()
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
