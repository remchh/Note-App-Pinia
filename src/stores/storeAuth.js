import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { useStoreNotes } from '@/stores/storeNotes'

export const useStoreAuth = defineStore('storeAuth', {
  //state is only for storing data
  state: () => {
    return { 
      user: {

      }
    }
  },
  //actions are just methods that allow us to access data to our state and modify it
  actions: {
    init(){
      const storeNotes = useStoreNotes()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/')
          storeNotes.init()
        } else {
          this.user = {}
          this.router.replace('/auth')
          storeNotes.clearNotes()
        }
      })
    },
    registerUser(credentials){
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
        //console.log('user', user)
      }).catch((error) => {
        //console.log('error.message', error.message)
      })
    },
    loginUser(credentials){
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
        //console.log('user', user)
      }).catch((error) => {
       //console.log('error', error.message)
      })
    },
    logoutUser(){
      signOut(auth).then(() => {
        //console.log('user signed out')
      }).catch((error) => {
        //console.log(error.message)
      })
    }
  },
  getters: {
  }
})