<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      bgColor="link"
      placeholder="Edit Note"
      label="Edit Note"
      ref="addEditNoteRef"
    >
      <template #buttons>
        <button
          class="button is-link is-light mr-2"
          @click="$router.back()"
        >
          Cancel
        </button>
        <button
          @click="handleSaveClick"
          class="button is-link has-background-link"
          :disabled="!noteContent"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRoute, useRouter  } from 'vue-router'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'

const storeNotes = useStoreNotes()

const route = useRoute()

const router = useRouter()

const noteContent = ref('')

noteContent.value = storeNotes.getNoteContent( route.params.id )

const handleSaveClick = () => {
  storeNotes.updateNote(route.params.id, noteContent.value)
  router.push('/')
}

</script>