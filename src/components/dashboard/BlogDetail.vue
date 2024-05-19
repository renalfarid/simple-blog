<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useApiRequest from '../../composable/useApiRequest'
import Comment from '../ui/Comment.vue'
import { format } from 'date-fns'

const route = useRoute()
const { state, fetchSlugPost, fetchPostComment, addLikeComment, addDislikeComment } = useApiRequest()
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

const likeComment = async (id) => {
  console.log("liked :", id)
  await addLikeComment(id)
  await getPosts()
  console.log("state :", state.data)
}

const dislikeComment = async (id) => {
  console.log("disliked :", id)
  await addDislikeComment(id)
  getPosts()
  console.log("state :", state.data)
}

const formatDate = (date) => {
    return format(new Date(date), 'MM-dd-yy HH:mm')
}
onMounted(() => {
  getPosts()
})
</script>

<template>
  <div v-if="post" class="m-10">
    <h1 class="text-xl font-semibold">{{ post.title }}</h1><br/>
    <div v-html="post.content"></div>
    <p><small>By {{ post.name }} on {{ post.published_date }}</small></p>
    <div class="comment-icon">
      <button @click="showComment()"><i class="fa fa-comment"></i>
       <span>Add a comment</span>
      </button>
    </div>
    <Comment :is_open="show" :id="post.id" @close="getPosts()"/>
    <div class="mt-10">
        <div class="antialiased mx-auto max-w-screen-sm">
            <div class="space-y-4">

                <div v-for="comment in comments" :key="comment.id" class="flex">
                <div class="flex-shrink-0 mr-3">
                    <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="">
                </div>
                <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <strong>{{ comment.name }}</strong> <span class="text-xs text-gray-400">{{ formatDate(comment.updated_at) }}</span>
                    <p class="text-sm">
                    {{ comment.content }}
                    </p>
                    <div class="flex items-center mt-2">
                        <button class="mr-2" @click="likeComment(comment.id)">
                         <i class="fas fa-thumbs-up"></i>
                         <span>{{ comment.likes_count }}</span>
                        </button>
                        <button @click="dislikeComment(comment.id)">
                            <i class="fas fa-thumbs-down"></i>
                            <span>{{ comment.dislikes_count }}</span>
                        </button>
                    </div>
                </div>
                </div>

            </div>
            </div>
    </div>
  </div>
  <div v-else>
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
