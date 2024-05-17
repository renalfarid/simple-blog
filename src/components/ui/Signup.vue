<script setup>
  import { ref } from 'vue';
  import useApiRequest from '@/composable/useApiRequest';

  const { state, signup } = useApiRequest();

  const password = ref("")
  const confirmPassword = ref("")
  const isValid = ref(true)
  const errorMessage = ref("")
  const form = ref({});

  const validatePassword = () => {
    if (password.value !== confirmPassword.value ) {
      isValid.value = false
      errorMessage.value = "Password doesn't match !"
      setTimeout(() => {
        isValid.value = true;
      }, 3000);
    }
  }

  const userData = {
    name: "",
    email: "",
    password: "",
    role: "", // admin or 'user'
  };

  const handleSignup = async () => {
   console.log("user data: ", form.value)
   userData.name = form.value.name
   userData.email = form.value.email
   userData.password = form.value.password
   userData.role = form.value.role
   await signup(userData);
   console.log("state: ", state)
  };

</script>
<template>
    <section class="bg-white">
      <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
        <img
          alt=""
          src="/diego-ph-fIq0tET6llw-unsplash.jpg"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </aside>
        <main
          class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div class="max-w-xl lg:max-w-3xl">
            <a class="block text-blue-600" href="/">
              <span class="sr-only">Home</span>
              <img src="/blog-logo.png" width="200" height="200" />
            </a>
    
            <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Simple Blog
            </h1>

            <div v-if="!isValid" role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
                <strong class="block font-medium text-red-800"> Something went wrong </strong>
            
                <p class="mt-2 text-sm text-red-700">
                {{ errorMessage }}
                </p>
            </div>
    
            <form @submit.prevent="handleSignup()" class="mt-8 grid grid-cols-6 gap-6">
              <div class="col-span-6">
                <label for="Name" class="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
    
                <input
                  v-model="form.name"
                  type="text"
                  id="Name"
                  name="name"
                  class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div class="col-span-6">
                <label for="Role" class="block text-sm font-medium text-gray-700">
                  Role
                </label>
    
                <input
                  v-model="form.role"
                  type="text"
                  id="Role"
                  name="role"
                  class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
    
              <!-- <div class="col-span-6 sm:col-span-3">
                <label for="LastName" class="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
    
                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div> -->
    
              <div class="col-span-6">
                <label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>
    
                <input
                  v-model="form.email"
                  type="email"
                  id="Email"
                  name="email"
                  class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
    
              <div class="col-span-6 sm:col-span-3">
                <label for="Password" class="block text-sm font-medium text-gray-700"> Password </label>
    
                <input
                  v-model="form.password"
                  type="password"
                  id="Password"
                  name="password"
                  class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
    
              <div class="col-span-6 sm:col-span-3">
                <label for="PasswordConfirmation" class="block text-sm font-medium text-gray-700">
                  Password Confirmation
                </label>
    
                <input
                  v-model="form.confirmPassword"
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button type="submit" class="inline-block shrink-0 rounded-md border border-blue-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
                  Create an account
                </button>
    
                <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="/login" class="text-gray-700 underline">Log in</a>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  </template>