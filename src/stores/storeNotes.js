import { defineStore } from 'pinia'
import { db } from '@/js/firebase'
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy, addDoc } from "firebase/firestore"
import { useStoreAuth } from '@/stores/storeAuth'


let notesCollectionRef 

let notesCollectionQuery 

let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  //state is only for storing data
  state: () => {
    return { 
      notes: [
       /**  {
          id: 'id1',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quasi at dolor, possimus, accusantium, alias omnis quidem reiciendis consequuntur libero nobis ullam est iste aliquid odio aliquam id necessitatibus labore?'
        },
        {
          id: 'id2',
          content: 'A short note!'
        }**/
      ],
      notesLoaded: false
    }
  },
  //actions are just methods that allow us to access data to our state and modify it
  actions: {
    init() {
      const storeAuth = useStoreAuth()
      notesCollectionRef = collection(db, "users", storeAuth.user.id, "notes")
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"))
      this.getNotes()
    },
    async getNotes() {
      this.notesLoaded = false
      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        })
        this.notes = notes
        this.notesLoaded = true
      }, error => {
        console.log('error.message:', error.message)
      })
    },
    clearNotes(){
      this.notes = []
      if(getNotesSnapshot) getNotesSnapshot() //unsubscribe for any active listener
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
      date = currentDate.toString()

      //this.notes.unshift(note)
      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date
      })
    },
    async deleteNote(idToDelete){
      //this.notes = this.notes.filter(note =>  note.id !== idToDelete)
      await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    async updateNote(id, content){
      //let index = this.notes.findIndex(note => note.id === id)
      //this.notes[index].content = content
      await updateDoc(doc(notesCollectionRef, id), {
        content
      })
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