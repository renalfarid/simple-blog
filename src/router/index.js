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
      path: '/blog/:slug',
      component: () => import('@/layouts/default/Default.vue'),
      children: [
        {
          path: '/blog/:slug',
          name: 'BlogDetail',
          component: () => import('@/views/BlogDetail.vue'),
        },
      ],
  },
  {
    path: '/dashboard/blog/:slug',
    component: () => import('@/layouts/default/Dashboard.vue'),
    children: [
      {
        path: '/dashboard/blog/:slug',
        name: 'DashboardBlogDetail',
        component: () => import('@/views/DashboardBlogDetail.vue'),
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
          component: () => import('@/views/Dashboard.vue'),
          meta: {
            requiresAuth: true 
          }
        },
      ],
  },
  {
    path: '/dashboard/manage',
    component: () => import('@/layouts/default/Dashboard.vue'),
    children: [
      {
        path: '/dashboard/manage',
        name: 'Posts',
        component: () => import('@/views/Manage.vue'),
        meta: {
          requiresAuth: true 
        }
      },
    ],
  },
  {
    path: '/dashboard/manage/create-post',
    component: () => import('@/layouts/default/Dashboard.vue'),
    children: [
      {
        path: '/dashboard/manage/create-post',
        name: 'CreatePost',
        component: () => import('@/views/CreatePost.vue'),
        meta: {
          requiresAuth: true 
        }
      },
    ],
  },
  {
    path: '/dashboard/manage/update-post/:id',
    component: () => import('@/layouts/default/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'UpdatePost',
        component: () => import('@/views/CreatePost.vue'),
        meta: {
          requiresAuth: true 
        }
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
  {
    path: '/dashboard/manage/comment',
    component: () => import('@/layouts/default/Dashboard.vue'),
    children: [
      {
        path: '/dashboard/manage/comment',
        name: 'ManageComment',
        component: () => import('@/views/ManageComment.vue'),
        meta: {
          requiresAuth: true 
        }
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