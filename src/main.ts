import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from './language/i18n'
import { store, key } from './store'



export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()

  app.config.globalProperties.$message = ElMessage

  app.use(router)
  app.use(store, key)
  app.use(ElementPlus)
  app.use(i18n)
  return { app, router }
}

// const app = createApp(App)
// app.config.globalProperties.$message = ElMessage
// app.use(router)
// app.use(store, key)
// app.use(ElementPlus)
// app.use(i18n)
// app.mount('#app')
