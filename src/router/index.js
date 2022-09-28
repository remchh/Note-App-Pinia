import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
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

router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth()
  console.log('to:', to)
  if(!storeAuth.user.id && to.name !== 'auth'){
    return {name: 'auth'}
  }
  if(storeAuth.user.id && to.name === 'auth'){
    return false
  }
})

export default router