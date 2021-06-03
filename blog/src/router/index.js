import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Blogs from '../views/Blogs.vue'
import MyBlogs from '../views/MyBlogs.vue'
import BlogUpdate from '../views/BlogUpdate.vue'
import BlogSave from '../views/BlogSave.vue'
import BlogDetail from '../views/BlogDetail.vue'
import UserUpdate from '@/views/UserUpdate'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect:{name: "Blogs"}
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/myBlogs',
    name: 'MyBlogs',
    component: MyBlogs,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blog/save',
    name: 'BlogSave',
    component: BlogSave,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/update',
    name: 'BlogUpdate',
    component: BlogUpdate,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user/update/:userId',
    name: 'UserUpdate',
    component: UserUpdate,
    meta: {
      requireAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
