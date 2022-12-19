# BozuPol-Web项目

vue3 + nuxt 实现ssr项目

## 使用技术栈

vue3 + vite + typescript + indexedDB

## 学习记录

1. vue-router中关于createWebHistory，createWebHashHistory， createMemoryHistory的认识和区别。  

> createWebHistory: history模式称为HTML5模式，利于SEO，路由格式：`http://example.com/home`
>
> createWebHashHistory: hash模式，hash改变不会触发请求，路由格式：`http://example.com/#home`
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

3. 利用unplugin-auto-import 和 unplugin-vue-components配置element-plus按需加载

> `npm install -D unplugin-auto-import unplugin-vue-components` 安装插件
>
> vite.config.ts中配置plugin
>
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ ElementPlusResolver() ]
    }),
    Components({
      resolvers: [ ElementPlusResolver() ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 配置alias
    }
  },
})
```

4. vite3配置scss只需要安装sass即可，无需vite.config.ts配置

5. 配置vue-i18n中报错`Uncaught SyntaxError: Not available in legacy mode`，需要在i18n初始化中配置`legacy: false`

```javascript
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  messages: {
    zh,
    en
  }
})

export default i18n
```

6. ts配置vuex4

```javascript
// store/index.ts
import { InjectionKey } from 'vue'  
import { createStore, Store, useStore as baseUseStore } from 'vuex'

type stateType = {
  locale: any,
  userStatus: number, 
}

export const key: InjectionKey<Store<stateType>> = Symbol('storekey')

export const store = createStore({
  ...
})

export function useStore() {
  return baseUseStore(key)
}

// main.ts
import { store, key } from './store'

const app = createApp(App)
app.use(store, key)


// 使用

import { useStore } from "@/store";

const { state, commit, dispatch } = useStore()

```
