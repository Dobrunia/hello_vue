<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div
    class="h-100px"
    flex="~ items-center justify-center"
  >
    <div text-6xl font-bold>
      {{ title }}
    </div>
  </div>
</template>

<style scoped></style>
