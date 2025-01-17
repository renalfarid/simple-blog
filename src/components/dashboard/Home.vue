<script setup>
import {onMounted, ref, computed} from "vue"
import useApiRequest from '../../composable/useApiRequest'

const { state, fetchFilterPosts, addLikePost, addDislikePost } = useApiRequest()

const data = ref([])
const searchQuery = ref('')

const fetchBlogPost = async () => {
  await fetchFilterPosts()
  data.value = state.data.results
}

const likePost = async (id) => {
  await addLikePost(id)
  await fetchBlogPost()
}

const dislikePost = async (id) => {
  await addDislikePost(id);
  await fetchBlogPost(); // Refresh posts to update dislike status
}

 onMounted(async() => {
  await fetchBlogPost();
})

const filteredPosts = computed(() => {
  if (!searchQuery.value) {
    return data.value;
  }
  return data.value.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

</script>
<template>
  <div class="m-10">
    <input v-model="searchQuery" type="text"
      placeholder="Search by title or content"
      class="mb-5 p-2 border rounded"
    />
    <article v-for="(item, index) in filteredPosts" :key="index" 
     class="mt-5 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-200 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
      <div class="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
        <time datetime="2022-10-10" class="block text-xs text-gray-500"> {{ item.published_date }} </time>
    
        <a :href="`/dashboard/blog/${item.slug}`">
          <h3 class="mt-5 text-lg font-medium text-gray-900">
            {{ item.title }}
          </h3>
        </a>
    
        <div class="mt-4 flex flex-wrap gap-1">
          <span
            class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
      <!-- Like and Comment Icons -->
      <div class="mt-4 ml-10 flex items-center space-x-4">
          <button @click="likePost(item.id)"
          :class="{'text-red-500': item.is_like, 'text-gray-500 hover:text-gray-700': !item.is_like}"  
           class="flex items-center text-gray-500 hover:text-gray-700">
            <i class="fas fa-thumbs-up"></i>
            <span class="ml-1">Like</span>
          </button>
          <button  @click="dislikePost(item.id)" 
            :class="{'text-red-500': item.is_dislike, 'text-gray-500 hover:text-gray-700': !item.is_dislike}"
            class="flex items-center text-gray-500 hover:text-gray-700">
            <i class="fas fa-thumbs-down"></i>
            <span class="ml-1">Dislike</span>
          </button>
          <span>Comments : {{ item.comment_count }}</span>
        </div>
  </article>
  </div>
  
</template>