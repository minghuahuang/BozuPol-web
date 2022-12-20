import { createApp } from "./main";
import database from './db'

const { app, router } = createApp()

router.beforeEach((to, from, next) => {
  database.db.openStore({
    ...database.languageObjectStore,
    ...database.userObjectStore
  }).then((res: any) => {
    console.log('初始化所有对象仓库', res)
    next()
  })
})

router.isReady().then(() => {
  app.mount('#app')
})