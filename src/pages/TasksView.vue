<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import Search from '@/components/Search.vue'
import TasksList from '@/components/TasksList.vue'
import { useTasksStore } from '@/stores/tasks'

const store = useTasksStore()
const searchQuery = ref('')

const filteredTasks = computed(() => {
  if (!searchQuery.value)
    return store.tasks
  return store.tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

onMounted(async () => {
  if (store.tasks.length === 0) {
    await store.fetchTasks()
  }
})
</script>

<template>
  <PageTitle title="Task List" />
  <Search v-model="searchQuery" />
  <TasksList :tasks="filteredTasks" />
</template>

<style scoped></style>
