<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';
import { useScrollLock } from '@vueuse/core';
import { watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['modalClose']);

function close() {
  if (props.isOpen) {
    emit('modalClose');
  }
}

const isLocked = useScrollLock(document.body);

watch(
  () => props.isOpen,
  open => isLocked.value = open
);
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop (затемнение) -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />

    <!-- Модальное окно -->
    <OnClickOutside
      @trigger="close"
      class="relative w-[300px] h-[300px] z-10 bg-gray-700"
      base-border
      p-4
    >
      <!-- Крестик в правом верхнем углу -->
      <button
        class="absolute top-2 right-2 p-1"
        base-hover
        i-line-md:menu-to-close-transition
        @click="close"
      />
      <slot />
    </OnClickOutside>
  </div>
</template>

<style scoped></style>
