<template>
  <div
    class="card has-background-dark mb-4"
  >
    <div class="card-content has-text-white-bis">
      <div class="content">
        {{ note.content }}
      <div class="columns is-mobile has-text-grey-light mt-2">
        <small class="column"> {{ dateFormatted }} </small>
        <small class="column has-text-right"> {{ contentLength }} </small>
      </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink
        :to="`/editNote/${ note.id }`"
        class="card-footer-item has-text-success-light"
        href="#"
      >
        Edit
      </RouterLink>
      
      <a
        @click.prevent="modals.deleteNote = true"
        class="card-footer-item has-text-success-light"
        href="#"
      >
        Delete
      </a>
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>

import  { computed, reactive } from 'vue'
import { useStoreNotes } from '@/stores/storeNotes'
import ModalDeleteNote from './ModalDeleteNote.vue'
import { useDateFormat } from '@vueuse/core'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const storeNotes = useStoreNotes()

const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date))
  return useDateFormat(date, 'DD-MM-YYYY @ HH:mm').value
})

const contentLength = computed(() =>{
  let length = props.note.content.length
  let description = length > 1 ? 'characters' : 'character'
  return `${length} ${description}`
}) 

const modals = reactive({
  deleteNote: false
})

</script>