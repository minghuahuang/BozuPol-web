import DB from '../../utils/indexedDB'
import { ElLoading } from 'element-plus'
const db = new DB('bozupol')

type ResponseType = {
  code: number,
  message: string,
  data: any
}

// 保存当前语言包接口
export async function savaLanguage(lang:any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, .7)',
    text: '包租婆正在赶来...'
  })
  await db.openStore('language', 'id', ['name'])
  const getRes: ResponseType = await db.getItem('language', 1).then(res => {
    return { code: 200, message: '操作成功', data: res || null }
  })
  const { code } = getRes
  let obj = {}
  if(code === 200) {
    obj = { name: lang, id: 1 }
  } else {
    obj = { name: lang }
  }

  const updateRes: ResponseType = await db.updateItem('language', obj).then(res => {
    setTimeout(() => {
      loading.close()
    }, 200);
    return { code: 200, message: '操作成功', data: null }
  })

  return updateRes
}

// 获取当前语言包接口
export async function fetchLanguage() {
  await db.openStore('language', 'id', ['name'])
  const getRes: ResponseType = await db.getItem('language', 1).then(res => {
    return { code: 200, message: '操作成功', data: res || null }
  })
  return getRes
}