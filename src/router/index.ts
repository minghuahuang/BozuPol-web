import home from '@/views/home/index.vue'
import login from '@/views/login/index.vue'
import { createRouter as _createRouter, createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'

/**
 * createWebHistory: history模式称为HTML5模式，利于SEO，路由格式：http://example.com/home
 * createWebHashHistory: hash模式，hash改变不会触发请求，路由格式：http://example.com/#home
 * createMemoryHistory: memory模式，基于内存的历史记录，主要处理ssr
 * 
 * createWebHistory，createWebHashHistory通过window.history.state来管理历史记录；
 * createMemoryHistory通过内部维护一个队列和一个位置指针进行路由记录管理，保证SSR中路由能正常进行；
 */

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: home,
    meta: {
      title: '',
      keepAlive: false,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: login,
    meta: {
      title: '',
      keepAlive: false,
    }
  },
]

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// export default router