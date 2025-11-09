<script setup lang="ts">
import type { Task } from '@/types/tasks'

defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  toggle: [taskId: string]
}>()
</script>

<template>
  <label
    flex="~ items-center justify-between"
    base-border
    class="p-4 w-[200px] cursor-pointer hover:opacity-70"
  >
    <span :class="{ 'line-through': task.done }">
      {{ task.title }}
    </span>
    <input
      :checked="task.done"
      type="checkbox"
      @change="emit('toggle', task.id)"
    >
  </label>
</template>

<style scoped></style>
