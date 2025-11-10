<script setup lang="ts">
const searchQuery = defineModel<string>({ default: '' })
</script>

<template>
  <div
    flex="~ items-center justify-center"
    base-border
    class="w-[254px] pr-2 group focus-within:border-white"
  >
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search..."
      class="pl-2 py-1 border-0 focus:outline-none"
    >
    <div i-line-md:search opacity-50 />
  </div>
</template>

<style scoped></style>
