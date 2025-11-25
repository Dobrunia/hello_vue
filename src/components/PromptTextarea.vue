<script setup lang="ts">
const prompt = defineModel<string>({ default: '' });

const emit = defineEmits<{
  submit: [value: string];
}>();

const handleSubmit = () => {
  if (prompt.value.trim()) {
    emit('submit', prompt.value);
  }
};
</script>

<template>
  <div flex="~ items-center justify-center" class="w-full h-63px">
    <div
      flex="~ items-center justify-between"
      class="h-full w-864px bg-[#303030] border-1 border-[#3a3a3a] rounded-28px font-size-24px line-height-[1.5] pr-10px pl-16px shadow-short"
    >
      <div class="p-2 bg-hover hover:bg-[#424242]">
        <div i-line-md:plus />
      </div>
      <input
        v-model="prompt"
        class="w-80% h-50% translate-y-[-2px] whitespace-pre-wrap outline-none user-select-none bg-transparent"
        placeholder="Спросите что-нибудь…"
        @keydown.enter.prevent="handleSubmit"
      />
      <div v-if="prompt.length < 1" flex="~ items-center justify-center gap-0.5rem">
        <div class="p-2 bg-hover hover:bg-[#424242]">
          <div i-tabler:microphone />
        </div>
        <div class="p-2 bg-hover bg-[#424242] hover:opacity-50">
          <svg
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
          >
            <path
              d="M7.167 15.416V4.583a.75.75 0 0 1 1.5 0v10.833a.75.75 0 0 1-1.5 0Zm4.166-2.5V7.083a.75.75 0 0 1 1.5 0v5.833a.75.75 0 0 1-1.5 0ZM3 11.25V8.75a.75.75 0 0 1 1.5 0v2.5a.75.75 0 0 1-1.5 0Zm12.5 0V8.75a.75.75 0 0 1 1.5 0v2.5a.75.75 0 0 1-1.5 0Z"
            ></path>
          </svg>
        </div>
      </div>
      <div
        v-if="prompt.length > 0"
        class="p-2 bg-hover hover:bg-[#424242] cursor-pointer"
        @click="handleSubmit"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
        >
          <path
            d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-hover {
  border-radius: 50%;
  cursor: pointer;
}

.user-select-none {
  user-select: none;
}

.shadow-short {
  box-shadow:
    0px 4px 12px 0px rgba(0, 0, 0, 0.1),
    inset 0px 0px 1px 0px rgba(255, 255, 255, 0.03);
}
</style>
