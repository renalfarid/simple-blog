<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useApiRequest from '../../composable/useApiRequest'

const { state, addUserPost, fetchUserPost, updateUserPost } = useApiRequest()
const router = useRouter()
const route = useRoute()

const isError = ref(false)
const errorMessage = ref('')
const form = ref({ title: '', content: '' })
const isUpdateMode = ref(false)

const createUserPost = async () => {
  const payload = {
    title: form.value.title,
    content: form.value.content,
    status: 'published',
  }

  if (isUpdateMode.value) {
    await updateUserPost(route.params.id, payload)
  } else {
    await addUserPost(payload)
  }

  const code = state?.data?.code
  const error = state?.data?.message
  if (code !== 200) {
    isError.value = true
    errorMessage.value = error
    return
  }
  router.push('/dashboard/manage')
}

onMounted(async () => {
  if (route.name === 'UpdatePost') {
    isUpdateMode.value = true
    const postId = route.params.id
    await fetchUserPost(postId)
  }
})

// Watch state for changes and update form
watch(state, () => {
  console.log('State changed:', state)
  if (isUpdateMode.value && state.data) {
    form.value.title = state.data.results.title
    form.value.content = state.data.results.content
    console.log('Form updated:', form.value)
  }
}, { deep: true })
</script>

<template>
  <section class="m-10 bg-gray-100">
    <div v-if="isError" role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
      <strong class="block font-medium text-red-800"> Something went wrong </strong>
      <p class="mt-2 text-sm text-red-700">
        {{ errorMessage }}
      </p>
    </div>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
        <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form @submit.prevent="createUserPost()" class="space-y-4">
            <div>
              <label class="sr-only" for="title">Title</label>
              <input
                v-model="form.title"
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Title Post"
                type="text"
                id="title"
              />
            </div>
            <div>
              <label class="sr-only" for="content">Content</label>
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
                {{ isUpdateMode ? 'Update' : 'Save and Publish' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
