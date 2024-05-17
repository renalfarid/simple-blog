import { ref, reactive } from 'vue';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || 'https://blog.test/api';

export default function useApiAuth() {
  const state = reactive({
    data: null,
    error: null,
    loading: false,
  });

  const signup = async (userData) => {
    state.loading = true;
    try {
      const response = await fetch(`${BASE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        state.data = response.json()
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json()
      state.data = data;
    } catch (error) {
      console.log("response error: ", error)
      state.error = error;
    } finally {
      state.loading = false;
    }
  };

  const login = async (userData) => {
    state.loading = true;
    try {
      const response = await fetch(`${BASE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json()
        state.data = errorData
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      state.data = data;
    } catch (error) {
      state.error = error;
    } finally {
      state.loading = false;
    }
  };

  return {
    state,
    signup,
    login
  };
}
