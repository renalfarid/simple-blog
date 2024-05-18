import { ref, reactive } from 'vue'
import useLocalStorage from './useLocalStorage'

const { getLocalStorage } = useLocalStorage()

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || 'https://blog.test/api'

let dataToken = getLocalStorage("session")
    if (dataToken.startsWith('"') && dataToken.endsWith('"')) {
        dataToken = dataToken.slice(1, -1)
    }

export default function useApiRequest() {
  const state = reactive({
    data: null,
    error: null,
    loading: false,
  })

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


  return {
    state,
    fetchPosts,
    fetchUserPosts,
    addLikePost
  }
}