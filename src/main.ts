import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from './language/i18n'
import database from './db'
import { store, key } from './store'

router.beforeEach((to, from, next) => {
  database.db.openStore({
    ...database.languageObjectStore,
    ...database.userObjectStore
  }).then((res: any) => {
    console.log('初始化所有对象仓库', res)
    next()
  })
})

const app = createApp(App)
app.config.globalProperties.$message = ElMessage
app.use(router)
app.use(store, key)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
