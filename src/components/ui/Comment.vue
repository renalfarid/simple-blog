<script setup>
  import {ref, onMounted, watch} from 'vue'
  import useApiRequest from '../../composable/useApiRequest'

  const { state, addPostComment } = useApiRequest()

  const props = defineProps(['is_open', 'id'])
  const emit = defineEmits(['close'])

  const isOpen = ref(false)
  const form = ref({})
  const id = ref(0)
  const errorMessage = ref('')
  const isError = ref(false)

  let payload = {}
  let error = null

  const handleSubmit = async () => {
     payload.content = form.value.content
     await addPostComment(id.value, payload)
     error = state.error
     if (error) {
        isError.value = true
        errorMessage.value = "Failed submit message"
     }
     isOpen.value = false
     emit('close')
  }

  onMounted(() => {
    isOpen.value = props.is_open
    id.value = props.id
  })

  watch(() => props.is_open, (newVal) => {
  isOpen.value = newVal
})
</script>
<template>
  <div v-if="isOpen">
    <section class="m-5 bg-gray-100">
    <div v-if="isError" role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
        <strong class="block font-medium text-red-800"> Something went wrong </strong>
    
        <p class="mt-2 text-sm text-red-700">
        {{ errorMessage }}
        </p>
    </div>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
        <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form @submit.prevent="handleSubmit()" class="space-y-4">
            <div>
            <label class="sr-only" for="content">Comment</label>
            <textarea
                v-model="form.content"
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Write your post here"
                rows="8"
                id="content"
            ></textarea>
            </div>

            <div class="mt-4">
            <button
                type="submit"
                class="inline-block w-full rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white sm:w-auto"
            >
                Add Comment
            </button>
            </div>
        </form>
        </div>
    </div>
    </div>
  </section>
  </div>
</template>