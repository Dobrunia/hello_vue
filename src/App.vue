<script setup lang="ts">
import { useDark } from '@vueuse/core'
import Header from '@/layout/Header.vue'

useDark()
</script>

<template>
  <div class="h-[calc(100vh-60px)]">
    <Header />
    <div flex="~ col gap-4 justify-center items-center" p-8>
      <router-view />
    </div>
  </div>
</template>

<style>
html.dark {
  background: #222;
  color: white;
  color-scheme: dark;
}
</style>
