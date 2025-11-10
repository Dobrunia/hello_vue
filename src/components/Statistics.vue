<script setup lang="ts">
import CircleProgress from 'vue3-circle-progress'
import { useDoneTasksPercent } from '@/composables/stats'
import 'vue3-circle-progress/dist/circle-progress.css'

const doneTasksPercent = useDoneTasksPercent()
</script>

<template>
  <div flex="~ col items-center justify-center gap-4">
    <span>Выполненно задач в %</span>
    <CircleProgress :percent="doneTasksPercent" :show-percent="true" fill-color="orange" empty-color="rgb(156 163 175 / 0.6)" />
  </div>
</template>

<style scoped></style>
