import { createApp } from "./main";
import database from './db'

const { app, router, store } = createApp()

if(window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

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
  router.beforeResolve((to, from, next) => {
    let toComponents = router.resolve(to).matched.flatMap(record => Object.values(record.components))
    let formComponents = router.resolve(from).matched.flatMap(record => Object.values(record.components))

    let actived = toComponents.filter((c,i) => {
      return formComponents[i] !== c
    })

    if(!actived.length) {
      return next()
    } else {
      next() // 先渲染页面，后请求数据（2选1）
    }

    Promise.all(actived.map((Component: any) => {
      if(Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute
        })
      }
    }))
    // .then(() => {
    //   next() // 先请求数据，后渲染页面（2选1， 可以实现一个loading）
    // })
  })
  app.mount('#app')
})