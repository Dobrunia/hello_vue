<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue';
import PromptTextarea from '@/components/PromptTextarea.vue';
import { gptApi } from '@/api/gpt';
import { ref } from 'vue';

const prompt = ref('');
const newChat = ref(true);
const loading = ref(false);
const messages = ref<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

const handleSubmit = async (value: string) => {
  if (!value.trim() || loading.value) return;

  const userMessage = value.trim();
  prompt.value = '';
  newChat.value = false;
  loading.value = true;

  messages.value.push({ role: 'user', content: userMessage });
  const assistantMessage = { role: 'assistant' as const, content: '' };
  messages.value.push(assistantMessage);

  try {
    await gptApi.streamMessage([...messages.value.slice(0, -1)], (delta) => {
      assistantMessage.content += delta;
    });
  } catch (error) {
    console.error('GPT API error:', error);
    assistantMessage.content = `Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <PageTitle title="Тестовое в CodeX" />
  <div flex="~ col justify-between items-center" class="h-[calc(100vh-236px)] w-full">
    <div v-if="!newChat" class="flex-1 w-full overflow-y-auto px-4">
      <div v-for="(msg, idx) in messages" :key="idx" class="mb-4">
        <div
          :class="msg.role === 'user' ? 'ml-auto text-right' : 'mr-auto text-left'"
          class="max-w-[80%] p-3 rounded-lg"
          :style="msg.role === 'user' ? 'background: #424242' : 'background: #3a3a3a'"
        >
          {{ msg.content }}
        </div>
      </div>
      <div v-if="loading" class="text-center text-gray-400">Отправка...</div>
    </div>
    <div>
      <div v-if="newChat" class="mb-32px px-1 text-pretty" flex="~ items-center justify-center">
        Что у тебя сегодня на уме?
      </div>
      <PromptTextarea v-model="prompt" @submit="handleSubmit" />
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
