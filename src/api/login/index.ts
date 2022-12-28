import { ElLoading } from 'element-plus'
import type { ResponseType } from '../type'
import database from '../../db/index'

const storeName = Object.keys(database.userObjectStore)[0]

// 用户注册
export async function userSign(params:any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, .7)',
    text: '包租婆正在赶来...'
  })

  // 验证手机号重复
  const hasPhone = await new Promise((resolve, reject) => {
    database.db.getItems(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.filter((item: any) => {
        if(item.phone === params.phone) {
          resolve(true)
        }
      })
      resolve(false)
    })
  })

  let response: ResponseType
  if(hasPhone) {
    response = await new Promise((resolve, reject) => {
      resolve({ code: 200, message: '数据存在', data: false })
    })
  } else {
    const obj = { status: 0 }
    Object.assign(params, obj)
    response = await new Promise((resolve, reject) => {
      database.db.updateItem(storeName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: 200, message: '操作成功', data: true })
      })
    })
  }
  return response
}

// 用户登录
export async function userLogin(params: any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, .7)',
    text: '包租婆正在赶来...'
  })

  // 校验手机号和密码是否正确
  const correct: any = await new Promise((resolve, reject) => {
    database.db.getItems(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.filter((item: any) => {
        if (item.phone === params.phone) { // 校验手机号
          if (item.password === params.password) { // 校验密码
            resolve({ code: 200, userId: item.userId })
          } else {
            resolve({ code: 600, userId: null })
          }
        }
      })
      // 其他
      resolve({ code: 800 })
    })
  })
  let response: ResponseType
  if (correct.code !== 200) {
    response = await new Promise((resolve, reject) => {
      resolve({ code: correct.code, message: correct.code === 600 ? '密码不正确' : (correct.code === 500 ? '手机号不正确' : '不存在该用户，请先注册'), data: null })
    })
  } else { 
    // 手机号和密码正确后更新登录状态
    const token = (new Date()).getTime() + ''
    localStorage.setItem("token", token)
    const obj = { status: 1, userId: correct.userId, token }
    Object.assign(params, obj)
    response = await new Promise((resolve, reject) => {
      database.db.updateItem(storeName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: 200, message: '操作成功', data: obj })
      })
    })
  }
  return response
}

// 用户登出
export async function userLogout() {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, .7)',
    text: '包租婆正在赶来...'
  })
  // 根据用户token更改登录态为0
  const correct: any = await new Promise((resolve, reject) => {
    database.db.getItems(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.filter((item: any) => {
        const token = localStorage.getItem("token")
        if (item.token && item.token.indexOf(token) !== -1) { // 存在相同token
          resolve({ userId: item.userId })
        }
      })
      resolve({ code: 700 })
    })
  })
  let response: ResponseType
  if (correct.code === 700) {
    response = await new Promise((resolve, reject) => {
      resolve({ code: 700, message: '登录过期', data: null })
    })
  } else {
    const params: object = await new Promise((resolve, reject) => {
      database.db.getItem(storeName, correct.userId).then((res: any) => {
        resolve(res)
      })
    })
    const obj = { status: 0, token: null }
    Object.assign(params, obj)
    response = await new Promise((resolve, reject) => {
      database.db.updateItem(storeName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: 200, message: '操作成功', data: null })
      })
    })
  }
  return response
}