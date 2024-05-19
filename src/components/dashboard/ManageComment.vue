<script setup>
  import { ref, onMounted } from 'vue'
  import useApiRequest from '../../composable/useApiRequest'

  const { state, fetchUserComments } = useApiRequest()

  const commentData = ref([])

  const getUserComments = async () => {
    await fetchUserComments()
    commentData.value = state?.data?.results
    console.log("state user comment: ", state.data.results)
  }

  const deleteComment = async (id) => {
    console.log("delete comment: ", id)
  }

  const updateComment = async (id) => {
    console.log("update comment: ", id)
  }

  onMounted(() => {
    getUserComments()
  })
</script>

<template>
  <div class="m-10">
    <article v-for="(item, index) in commentData" :key="index" 
     class="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
    >
    <a href="#">
      <h3 class="mt-0.5 text-lg font-medium text-gray-900">
        {{  item.title }}
      </h3>
    </a>
  
    <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
      {{ item.content }}
    </p>

    <div class="mt-4 ml-10 flex items-center space-x-4">
        <button @click="updateComment(item.id)" class="flex items-center text-gray-500 hover:text-gray-700">
          <i class="fas fa-edit"></i>
          <span class="ml-1">Edit</span>
        </button>
        <button @click="deleteComment(item.id)" class="flex items-center text-gray-500 hover:text-gray-700">
          <i class="fas fa-trash"></i>
          <span class="ml-1">Delete</span>
        </button>
      </div>
  
  </article>
  </div> 
  
</template>