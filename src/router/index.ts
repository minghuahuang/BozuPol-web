import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

/**
 * createWebHistory: history模式称为HTML5模式，利于SEO，路由格式：http://example.com/home
 * createWebHashHistory: hash模式，hash改变不会触发请求，路由格式：http://example.com/#home
 * createMemoryHistory: memory模式，基于内存的历史记录，主要处理ssr
 * 
 * createWebHistory，createWebHashHistory通过window.history.state来管理历史记录；
 * createMemoryHistory通过内部维护一个队列和一个位置指针进行路由记录管理，保证SSR中路由能正常进行；
 */

const home = () => import('@/views/home/index.vue')
const login = () => import('@/views/login/index.vue')
const detail = () => import('@/views/detail/index.vue')

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: home,
    meta: {
      title: 'BozuPol-国内最大的养老机构平台',
      keywords: 'BozuPol，高品质养老，旅居养老',
      description: '连锁品牌，活力养老，失能照护，医保定点，康复护理，临终关怀',
      keepAlive: false,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: login,
    meta: {
      title: 'BozuPol-国内最大的养老机构平台',
      keywords: 'BozuPol，高品质养老，旅居养老',
      description: '连锁品牌，活力养老，失能照护，医保定点，康复护理，临终关怀',
      keepAlive: false,
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: detail,
    meta: {
      title: 'BozuPol-国内最大的养老机构平台',
      keywords: 'BozuPol，高品质养老，旅居养老',
      description: '连锁品牌，活力养老，失能照护，医保定点，康复护理，临终关怀',
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
