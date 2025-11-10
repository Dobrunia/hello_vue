import { computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'

export function useDoneTasksPercent() {
  const store = useTasksStore()

  const doneTasksPercent = computed(() => {
    const total = store.tasks.length
    if (total === 0)
      return 0
    const done = store.tasks.filter(task => task.done).length
    return Math.round((done * 100) / total)
  })

  return doneTasksPercent
}
