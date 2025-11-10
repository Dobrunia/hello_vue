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
    card-bd
    base-hover
    class="p-4 w-[200px] cursor-pointer select-none"
    :class="{ 'opacity-30': task.done }"
  >
    <span :class="{ 'line-through': task.done }">
      {{ task.title }}
    </span>
    <input
      :checked="task.done"
      class="sr-only"
      type="checkbox"
      @change="emit('toggle', task.id)"
    >
    <div v-if="task.done" i-tabler:square-rounded-check-filled />
    <div v-else i-tabler:square-rounded-check opacity-50 />
  </label>
</template>

<style scoped></style>
