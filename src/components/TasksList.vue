<script setup lang="ts">
import type { Task as TaskType } from '@/types/tasks'
import { useTasksStore } from '@/stores/tasks'
import Task from './Task.vue'

defineProps<{
  tasks: TaskType[]
}>()

const store = useTasksStore()
</script>

<template>
  <TransitionGroup
    name="task-list"
    tag="div"
    class="w-full p-8"
    flex="~ row wrap"
    gap="2"
  >
    <Task
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="store.toggleTask(task.id)"
    />
  </TransitionGroup>
</template>

<style scoped>
/* Анимация появления/исчезновения */
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}

.task-list-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(-10px);
}
</style>
