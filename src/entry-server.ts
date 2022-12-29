import { createApp, asyncDataFilter } from "./main";
import { ID_INJECTION_KEY } from 'element-plus';
import { renderToString } from 'vue/server-renderer'

export async function render(url: string, manifest: any) {
  const { app, router, store } = createApp()

  app.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  })

  await router.push(url)
  await router.isReady()

  const matchComponents = router.currentRoute.value.matched.flatMap(record => Object.values(record.components))

  // // 对所有匹配的路由组件调用 asyncData()
  await asyncDataFilter(matchComponents, store, router.currentRoute)

  const context: any = {}
  const appHtml = await renderToString(app, context)

  const { state } = store
  if(import.meta.env.PROD) {  
    const preloadLinks = renderLinks(context.modules, manifest)
    return { appHtml, state, preloadLinks }
  } else {
    return { appHtml, state }
  }
}

function renderLinks(modules: any, manifest: any) {
  let links = ''
  modules.forEach((id: any) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: any) => {
        links += renderPreloadLink(file)
      })
    }
  });
  return links
}

function renderPreloadLink(file: any) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    return ''
  }
}