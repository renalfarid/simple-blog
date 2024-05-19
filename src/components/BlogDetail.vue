<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useApiRequest from '../composable/useApiRequest'
import Comment from '../components/ui/Comment.vue';

const route = useRoute()
const { state, fetchSlugPost, fetchPostComment } = useApiRequest()
const post = ref(null)
const show = ref(false)
const comments = ref([])
let postId = 0

const getPostComments = async(post_id) => {
  await fetchPostComment(post_id)
  comments.value = state?.data?.results
  console.log('state: ', state?.data?.results)
}

const getPosts = async () => {
  const slug = route.params.slug
  await fetchSlugPost(slug)
  post.value = state?.data?.results
  postId = post.value.id
  getPostComments(postId)
  console.log("post: ", postId)
}

const showComment = () => {
  show.value = !show.value
}

onMounted(() => {
  getPosts()
})
</script>

<template>
    <div v-if="post" class="m-10">
      <h1 class="text-2xl font-semibold mb-2">{{ post.title }}</h1>
      <div class="flex items-center text-gray-500 mb-4">
        <span class="mr-2">By {{ post.name }}</span>
        <span class="mr-2">|</span>
        <span>{{ post.published_date }}</span>
      </div>
      <div class="border-b border-gray-300 mb-6"></div> <!-- Divider line -->
  
      <div class="text-gray-700 leading-relaxed" v-html="post.content"></div>
  
      <div class="mt-6 flex items-center">
        <button @click="showComment()" class="flex items-center text-indigo-600 hover:text-indigo-800">
          <i class="fa fa-comment mr-1"></i>
          <span>Add a comment</span>
        </button>
      </div>
  
      <Comment :is_open="show" :id="post.id" @close="getPosts()" class="mt-8" />
  
      <div class="mt-10">
        <h2 class="text-xl font-semibold mb-4">Comments</h2>
  
        <div v-if="comments.length > 0" class="space-y-4">
          <div v-for="comment in comments" :key="comment.id" class="flex items-start">
            <img class="w-10 h-10 mr-4 rounded-full" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="Avatar">
            <div class="flex-1 border rounded-lg px-4 py-2">
              <div class="flex justify-between">
                <strong>{{ comment.name }}</strong>
                <span class="text-xs text-gray-400">{{ comment.created_at }}</span>
              </div>
              <p class="text-sm">{{ comment.content }}</p>
            </div>
          </div>
        </div>
        <p v-else>No comments yet.</p>
      </div>
    </div>
    <div v-else class="m-10">
      <p>Loading...</p>
    </div>
  </template>

<style scoped>
.comment-icon {
  margin-top: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.comment-icon i {
  margin-right: 8px;
}
</style>
