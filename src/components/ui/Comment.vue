<script setup>
  import {ref, onMounted} from 'vue'
  const props = defineProps(['is_open'])
  const isOpen = ref(false)

  onMounted(() => {
    isOpen.value = props.is_open
  })
</script>
<template>
  <div v-if="props.is_open">
    <section class="m-5 bg-gray-100">
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
        <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form class="space-y-4">
            <div>
            <label class="sr-only" for="content">Comment</label>
            <textarea
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