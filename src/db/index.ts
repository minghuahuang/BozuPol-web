import DB from '../utils/indexedDB'
import languageObjectStore from './objectStores/language' // 引入语言类型对象仓库
import userObjectStore from './objectStores/user' // 引入用户信息对象仓库
import orderObjectStore from './objectStores/order' // 引入订单对象仓库

// 数据库
export const db = new DB('bozupol')

export default {
  db,
  languageObjectStore,
  userObjectStore,
  orderObjectStore
}
