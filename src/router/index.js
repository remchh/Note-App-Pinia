import { createRouter, createWebHashHistory } from 'vue-router'

import PageNotes from '@/pages/PageNotes.vue'
import PageEditNote from '@/pages/PageEditNote.vue'
import PageStats from '@/pages/PageStats.vue'
import PageAuth from '@/pages/PageAuth.vue'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: PageNotes
  },
  {
    path: '/editNote/:id',
    name: 'edit-note',
    component: PageEditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: PageStats
  },
  {
    path: '/auth',
    name: 'auth',
    component: PageAuth
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router