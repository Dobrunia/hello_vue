import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../pages/HomeView.vue'
import TaskList from '../pages/TasksView.vue'
import GptView from '../pages/GptView.vue'

const routes = [
  { path: '/', component: HomeView, meta: { layout: 'Header' } },
  { path: '/tasks', component: TaskList, meta: { layout: 'Header' } },
  { path: '/gpt', component: GptView, meta: { layout: 'Header' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
