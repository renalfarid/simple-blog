<script setup>
 import useLocalStorage from '../../composable/useLocalStorage'
 import { useRouter } from 'vue-router'

 const { clearLocalStorage } = useLocalStorage()
 const router = useRouter()

 const logout = () => {
    clearLocalStorage('session')
    clearLocalStorage('user')
    router.push('/')
 }
</script>
<template>
    <div class="mt-10 ml-10">
      <div class="sm:hidden">
        <label for="Tab" class="sr-only">Tab</label>
    
        <select id="Tab" class="w-full rounded-md border-gray-200">
          <option selected>Home</option>
          <option>My Posts</option>
        </select>
      </div>
    
      <div class="hidden sm:block">
        <nav class="flex gap-6" aria-label="Tabs">
          <a
            href="/dashboard"
            class="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            aria-current="page"
          >
            Home
          </a>
    
          <a
            href="/dashboard/manage"
            class="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            Manage Posts
          </a>

          <a href="#" @click.prevent="logout()"
            class="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
            Logout
          </a>
    
        </nav>
      </div>
    </div>
  </template>