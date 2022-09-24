<template>
  <div
    class="div car p-4 mb-5"
    :class="`has-background-${ bgColor }-dark`"
  >
    <label
      v-if="label"
      class="label has-text-white"
    >
      {{ label }}
    </label>
    <div class="field">
      <div class="control">
        <textarea
          v-model="modelValue"
          @input="$emit('update:modelValue', modelValue)"
          class="textarea"
          ref="textareaRef"
          :placeholder="placeholder"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"/>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: 'success'
  },
  placeholder: {
    type: String,
    default: 'Type something...'
  },
  label: {
    type: String
  }
})

const emit = defineEmits([
  'update:modelValue'
])

const textareaRef = ref(null)

const focusTextArea = () => {
  textareaRef.value.focus()
}

//expose methods from the child component to the parent
defineExpose({
  focusTextArea
})

</script>