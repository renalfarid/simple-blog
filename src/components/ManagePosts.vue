<script setup>
import {onMounted, ref} from "vue"
import useApiRequest from '../composable/useApiRequest'
const { state, fetchUserPosts, addLikePost } = useApiRequest();

console.log("state: ", state);

const data = ref([]); 

const fetchBlogPost = async () => {
  await fetchUserPosts();
  data.value = state.data.results;
}

const likePost = async (id) => {
  await addLikePost(id)
  console.log("id like: ", id)
}

 onMounted(async() => {
  await fetchBlogPost();
});
</script>
<template>
  <div class="m-10">
    <article v-for="(item, index) in data" :key="index" 
     class="mt-5 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-200 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
      <div class="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
        <time datetime="2022-10-10" class="block text-xs text-gray-500"> {{ item.published_date }} </time>
    
        <a href="#">
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
          <button class="flex items-center text-gray-500 hover:text-gray-700">
            <i class="fas fa-comment"></i>
            <span class="ml-1">Comment</span>
          </button>
        </div>
  </article>
  </div>
  
</template>