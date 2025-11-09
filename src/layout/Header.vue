<script setup>
</script>

<template>
  <header>
    <nav class="flex items-center justify-center gap-5 p-2">
      <router-link to="/" class="nav-link">
        Home
      </router-link>
      <router-link to="/tasks" class="nav-link">
        Tasks
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
.nav-link.router-link-active {
  background-color: #3f3f3f;
}
</style>
