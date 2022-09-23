<template>

  <div class="div car has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
        <textarea
          v-model="newNote"
          class="textarea"
          ref="newNoteRef"
          placeholder="Add a new note"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button
          @click="addNote"
          class="button is-link has-background-success"
          :disabled="!newNote"
        >
          Add New Note
        </button>
      </div>
    </div>

    <Note
      v-for="note in storeNotes.notes"
      :key="note.id"
      :note="note"
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
import { useStoreNotes } from '@/stores/storeNotes'

const storeNotes = useStoreNotes()

const newNote = ref('')

const newNoteRef = ref(null)


const addNote = () => {
  storeNotes.addNote(newNote.value)

  newNote.value = ''
  newNoteRef.value.focus()
}


</script>