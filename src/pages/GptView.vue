<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue';
import PromptTextarea from '@/components/PromptTextarea.vue';
import { ref } from 'vue';

const prompt = ref('');
const newChat = ref(true);
</script>

<template>
  <PageTitle title="Тестовое в CodeX" />
  <div flex="~ col justify-between items-center" class="h-[calc(100vh-236px)] w-full">
    <div v-if="newChat"></div>
    <div>
      <div v-if="!newChat"
        class="mb-32px px-1 text-pretty"
        flex="~ items-center justify-center"
      >
        Что у тебя сегодня на уме?
      </div>
      <PromptTextarea v-model="prompt" />
    </div>
  </div>
</template>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'); */

.text-pretty {
  white-space: pre-wrap;
  text-wrap: pretty;
  font-size: 28px;
  font-weight: var(--font-weight-normal);
  letter-spacing: 0.38px;
  line-height: 34px;
  /* font-family: 'Roboto', sans-serif; */
}
</style>
