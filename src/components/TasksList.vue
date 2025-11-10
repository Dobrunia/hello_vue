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
  <div
    flex="~ row wrap gap-2"
  >
    <Task
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="store.toggleTask(task.id)"
    />
  </div>
</template>

<style>

</style>
