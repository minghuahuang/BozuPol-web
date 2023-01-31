import { ElLoading } from 'element-plus'
import type { ResponseType } from '../type'
import database from '../../db/index'

const storeName = Object.keys(database.orderObjectStore)[0]

// 保存订单
export async function saveOrder(params:any) {
  const userId = localStorage.getItem('userId')
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  
  // 是否存在相同订单Id
  const hasCode = await new Promise((resolve, reject) => {
    database.db.getItems(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.filter((item: any) => {
        if (item.code === params.code && item.userId === userId) { // 存在相同订单Id
          resolve(true)
        }
      })
      resolve(false)
    })
  })
  let result: ResponseType
  if (hasCode) {
    result = await new Promise((resolve, reject) => {
      resolve({ code: 200, message: '数据已存在', data: true })
    })
  } else {
    Object.assign(params, { userId })
    result = await new Promise((resolve, reject) => {
      database.db.updateItem(storeName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: 200, message: '操作成功', data: null })
      })
    })
  }
  return result
}

// 订单列表
export async function orderList() {
  const userId = localStorage.getItem('userId')
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })

  const result: ResponseType = await new Promise((resolve, reject) => {
    database.db.getItems(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res = res.filter((item: any) => {
        return item.userId === userId
      })
      // 延迟200毫秒，模拟异步组件的效果
      setTimeout(() => { 
        resolve({ code: 200, message: '操作成功', data: res || null })
      }, 200)
    })
  })
  return result
}