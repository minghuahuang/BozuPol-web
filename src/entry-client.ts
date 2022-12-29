import { createApp, asyncDataFilter } from "./main";
import database from './db'

const { app, router, store } = createApp()

if((window as any).__INITIAL_STATE__) {
  store.replaceState((window as any).__INITIAL_STATE__)
}

router.beforeEach((to, from, next) => {
  database.db.openStore({
    ...database.languageObjectStore,
    ...database.userObjectStore
  }).then((res: any) => {
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

    asyncDataFilter(actived, store, router.currentRoute)
    // .then(() => {
    //   next() // 先请求数据，后渲染页面（2选1， 可以实现一个loading）
    // })
    
  })
  app.mount('#app')
})