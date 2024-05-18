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
          meta: {
            requiresAuth: true // Add meta field to indicate protected route
          }
        },
      ],
  },
  {
    path: '/manage',
    component: () => import('@/layouts/default/Dashboard.vue'),
    children: [
      {
        path: '/manage',
        name: 'Posts',
        component: () => import('@/views/Manage.vue'),
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

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
      const token = localStorage.getItem('session');
      if (token) {
        next();
      } else {
        next('/login');
      }
    } else {
      next();
    }
  });

  export default router