<script setup lang="ts">
defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['modalClose'])
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop (затемнение) -->
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="emit('modalClose')"
      />

      <!-- Модальное окно -->
      <div
        class="relative w-[300px] h-[300px] z-10 modal-content bg-gray-700"
        base-border
        p-4
      >
        <!-- Крестик в правом верхнем углу -->
        <button
          class="absolute top-2 right-2 p-1 hover:opacity-70 transition-opacity"
          i-line-md:menu-to-close-transition
          @click="emit('modalClose')"
        />

        <h1>Submit Modal</h1>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Анимация backdrop */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Анимация модального окна */
.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
  opacity: 0;
}
</style>
