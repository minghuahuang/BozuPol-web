import App from './App.vue'

import { createSSRApp } from 'vue'

import { createRouter } from './router'
import { createStore, key } from './store'
import { createI18n } from './language/i18n'

import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

import { sync } from 'vuex-router-sync'

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const store = createStore()
  const i18n = createI18n()

  sync(store, router)

  app.use(router)
  app.use(store, key)
  app.use(i18n)

  app.use(ElementPlus)
  app.config.globalProperties.$message = ElMessage

  return { app, router, store }
}

export function asyncDataFilter(actived: any, store: any, route: any) {
  return Promise.all(actived.map((Component: any) => {
    if(Component.asyncData) {
      return Component.asyncData({
        store,
        route,
      })
    }
  }))
}
