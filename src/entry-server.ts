import { createApp } from "./main";
import { ID_INJECTION_KEY } from 'element-plus';
import { renderToString } from 'vue/server-renderer'

export async function render(url: string) {
  const { app, router, store } = createApp()

  app.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  })

  await router.push(url)
  await router.isReady()

  const matchComponents = router.currentRoute.value.matched.flatMap(record => {
    console.log('router',record)
    Object.values(record.components)
  })

  // // 对所有匹配的路由组件调用 asyncData()
  // await Promise.all(matchComponents.map((Component: any) => {
  //   if(Component.asyncData) {
  //     return Component.asyncData({
  //       store,
  //       route: router.currentRoute
  //     })
  //   }
  // }))

  const html = await renderToString(app)
  return html
}
