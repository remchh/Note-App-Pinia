import { defineStore } from 'pinia'

export const useStoreNotes = defineStore('counter', {
  //state is only for storing data
  state: () => {
    return { 
      notes: [
        {
          id: 'id1',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quasi at dolor, possimus, accusantium, alias omnis quidem reiciendis consequuntur libero nobis ullam est iste aliquid odio aliquam id necessitatibus labore?'
        },
        {
          id: 'id2',
          content: 'A short note!'
        }
      ]
    }
  },
  //actions are just methods that allow us to access data to our state and modify it
  actions: {
    addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
      id = currentDate.toString()

      let note = {
        id,
        content: newNoteContent
      }
      this.notes.unshift(note)
    },
    deleteNote(idToDelete){
      console.log(idToDelete)
      this.notes = this.notes.filter(note => { return note.id !== idToDelete})
    }
  }
})