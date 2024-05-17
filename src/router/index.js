import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
          {
            path: '/',
            name: 'Home',
            component: () => import('@/views/Home.vue'),
          },
        ],
    },
    {
      path: '/dashboard',
      component: () => import('@/layouts/default/Dashboard.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Home.vue'),
        },
      ],
  },
    {
        path: '/register',
        component: () => import('@/layouts/default/Blank.vue'),
        children: [
          {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/Register.vue'),
          },
        ],
    },
    {
      path: '/login',
      component: () => import('@/layouts/default/Blank.vue'),
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/views/Login.vue'),
        },
      ],
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  export default router