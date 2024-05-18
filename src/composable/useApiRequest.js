import { ref, reactive } from 'vue'
import useLocalStorage from './useLocalStorage'

const { getLocalStorage } = useLocalStorage()

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || 'https://blog.test/api'

let dataToken = getLocalStorage("session")

if (dataToken?.startsWith('"') && dataToken?.endsWith('"')) {
    dataToken = dataToken.slice(1, -1)
}

export default function useApiRequest() {
  const state = reactive({
    data: null,
    error: null,
    loading: false,
  })

  // /posts?slug=

  const fetchPosts = async () => {
    state.loading = true
    try {
      const response = await fetch(`${BASE_API_URL}/posts`)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      state.data = data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const fetchSlugPost = async (slug) => {
    state.loading = true
    try {
      const response = await fetch(`${BASE_API_URL}/posts?slug=${slug}`)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      state.data = data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const fetchUserPost = async (post_id) => {
    state.loading = true
    try {
      const response = await fetch(`${BASE_API_URL}/posts?post_id=${post_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${dataToken}`,
            'Content-Type': 'application/json' 
        }
        })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      state.data = data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const fetchUserPosts = async () => {
    state.loading = true
    try {
      const response = await fetch(`${BASE_API_URL}/user/posts`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${dataToken}`,
            'Content-Type': 'application/json' 
        }
        })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      state.data = data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }
  
  const addUserPost = async (payload) => {
    state.loading = true
    try {
        const response = await fetch(`${BASE_API_URL}/user/posts`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${dataToken}`,
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload)
          })
      if (!response.ok) {
        state.data = await response.json()
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      state.data = data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const updateUserPost = async (id, payload) => {
    state.loading = true
    try {
        const response = await fetch(`${BASE_API_URL}/user/posts/${id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${dataToken}`,
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload)
          })
      if (!response.ok) {
        state.data = await response.json()
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      state.data = data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const deleteUserPost = async ($id) => {
    state.loading = true
    try {
        const response = await fetch(`${BASE_API_URL}/user/posts/${$id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${dataToken}`,
              'Content-Type': 'application/json' 
            },
          })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      state.data = data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const addLikePost = async (id) => {
    try {
        const response = await fetch(`${BASE_API_URL}/user/like/posts/${id}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${dataToken}`,
              'Content-Type': 'application/json' 
            }
          })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      state.data = data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const addDislikePost = async (id) => {
    try {
        const response = await fetch(`${BASE_API_URL}/user/dislike/posts/${id}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${dataToken}`,
              'Content-Type': 'application/json' 
            }
          })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      state.data = data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const fetchPostComment = async (id) => {
    state.loading = true
    try {
      const response = await fetch(`${BASE_API_URL}/posts/comments/${id}`)
      if (!response.ok) {
        console.log("response comment: ", response.json())
        state.data = await response.json()
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      state.data = data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const addPostComment = async (id, payload) => {
    try {
        const response = await fetch(`${BASE_API_URL}/user/comments/${id}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${dataToken}`,
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload)

          })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      state.data = data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }


  return {
    state,
    fetchPosts,
    fetchSlugPost,
    fetchUserPosts,
    fetchUserPost,
    addUserPost,
    addLikePost,
    addDislikePost,
    deleteUserPost,
    fetchPostComment,
    addPostComment,
    updateUserPost
  }
}