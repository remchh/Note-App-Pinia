<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li
          :class="{'is-active' : !register }"
        >
        <a @click.prevent="register = false" class="has-text-white-bis">Login</a>
        </li>
        <li
          :class="{'is-active' : register }"
        >
        <a @click.prevent="register = true" class="has-text-white-bis">Register</a>
        </li>
      </ul>
    </div>
      <div class="auth-form"> 
        <div class="card">
          <div class="card-content">
            <div class="title has-text-centered">
              {{ formTitle }}
            </div>

            <form
              @submit.prevent="onSubmit"
            >
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    v-model="credentials.email"
                    class="input"
                    placeholder="e.g. alexsmith@gmail.com"
                    type="email"
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    v-model="credentials.password"
                    class="input"
                    placeholder="Enter a password"
                    type="password"
                  >
                </div>
              </div>
              <div class="field is-grouped is-grouped-right">
                <p class="control">
                  <button class="button is-primary">
                    {{ formTitle }}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>  
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()

const register = ref(false)

const formTitle = computed(() => {
  return register.value ? 'Register' : 'Login'
})

const credentials = reactive({
  email: '',
  password: ''
})

const onSubmit = () => {
  if(!credentials.email || !credentials.password) {
    alert('Please enter and email and password')
  }
  else {
    if(register.value) {
      storeAuth.registerUser(credentials)
    }
    else {
      storeAuth.loginUser(credentials)
    }
  }
}

</script>

<style>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}

</style>