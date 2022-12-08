# BozuPol-Web项目

vue3 + nuxt 实现ssr项目

## 使用技术栈

vue3 + vite + typescript

## 学习记录

1. vue-router中关于createWebHistory，createWebHashHistory， createMemoryHistory的认识和区别。  

> createWebHistory: history模式称为HTML5模式，利于SEO，路由格式：`http://example.com/home`
>
> createWebHashHistory: hash模式，hash改变不会触发请求，路由格式：http://example.com/#home
>
> createMemoryHistory: memory模式，基于内存的历史记录，主要处理ssr
>
> createWebHistory，createWebHashHistory通过window.history.state来管理历史记录
>
> createMemoryHistory通过内部维护一个队列和一个位置指针进行路由记录管理，保证SSR中路由能正常进行
>
[具体参考here](https://blog.csdn.net/qq_33635385/article/details/125120460)  

2. vue-router中路由跳转以及使用query和params进行参数传递。

> 使用路由导航`<router-link to="/home">Nav</router-link>`的方式进行路由跳转
>
> 使用`<router-view />` 和 `router.push()` 的方式进行路由跳转
>
> `router.push({ path: '/mine', query: { id: 1 } })` 使用path + query传参，通过routes.query获取参数
>
> `router.push({ name: 'Home', params: { id: 2 } })` 使用name + params传参，通过routes.params获取参数
>  
