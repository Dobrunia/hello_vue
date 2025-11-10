<script setup lang="ts">
import { onMounted } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import Search from '@/components/Search.vue'
import TasksList from '@/components/TasksList.vue'
import { useTasksStore } from '@/stores/tasks'

const store = useTasksStore()

onMounted(async () => {
  if (store.tasks.length === 0) {
    await store.fetchTasks()
  }
})
</script>

<template>
  <PageTitle title="Task List" />
  <Search />
  <TasksList :tasks="store.tasks" />
</template>

<style scoped></style>
