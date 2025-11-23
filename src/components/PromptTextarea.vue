<script setup lang="ts">
const prompt = defineModel<string>({ default: '' });
</script>

<template>
  <div flex="~ items-center justify-center" class="w-full h-63px">
    <div
      flex="~ items-center justify-between"
      class="h-full w-864px bg-[#303030] border-1 border-[#3a3a3a] rounded-28px font-size-24px line-height-[1.5] pr-10px pl-20px shadow-short"
    >
      <div i-line-md:plus />
      <input
        class="w-80% h-50% translate-y-[-2px] whitespace-pre-wrap outline-none user-select-none"
        placeholder="Спросите что-нибудь…"
      />
      <div i-tabler:microphone></div>
      <div class="bg-[#424242] rounded-full p-2">
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
  </div>
</template>

<style scoped>
.user-select-none {
  user-select: none;
}

.shadow-short {
  box-shadow:
    0px 4px 12px 0px rgba(0, 0, 0, 0.1),
    inset 0px 0px 1px 0px rgba(255, 255, 255, 0.03);
}
</style>
