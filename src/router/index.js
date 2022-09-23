import { createRouter, createWebHashHistory } from 'vue-router'

import PageNotes from '@/pages/PageNotes.vue'
import PageStats from '@/pages/PageStats.vue'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: PageNotes
  },
  {
    path: '/stats',
    name: 'stats',
    component: PageStats
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router