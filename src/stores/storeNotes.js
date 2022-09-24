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
      this.notes = this.notes.filter(note =>  note.id !== idToDelete)
    },
    updateNote(id, content){
      let index = this.notes.findIndex(note => note.id === id)
      console.log(index)
      this.notes[index].content = content
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id)[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})