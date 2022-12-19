export default class DB {
  private dbName:string
  private db:any
  constructor(dbName:string) {
    this.dbName = dbName
  }
  // 打开数据库
  public openStore(stores:any) {
    const request = window.indexedDB.open(this.dbName, 1) // 参数:数据库名称，数据库版本，默认为1
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        this.db = event?.target?.result
        console.log('数据库打开成功')
        resolve(true)
      }
      request.onerror = error => {
        reject(error)
        console.log('数据库打开失败')
      }
      request.onupgradeneeded = event => {
        console.log('数据库升级成功')
        const { result }:any = event.target
        // 初始化多个ojectStore对象仓库
        for (const storeName in stores) { 
          const { keyPath, indexs } = stores[storeName]
          // 没有表则新建表
          if (!result.objectStoreNames.contains(storeName)) { 
            // keyPath：主键，主键（key）是默认建立索引的属性； autoIncrement：是否自增；createObjectStore会返回一个对象仓库objectStore(即新建一个表)
            const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })
            if (indexs && indexs.length) {
              indexs.map((v: string) =>
                // createIndex可以新建索引，unique字段是否唯一
                store.createIndex(v, v, { unique: false })
              )
            }
            store.transaction.oncomplete = (e: any) => {
              console.log('创建对象仓库成功')
            }
          }
        }
      }
    })
  }

  // 增(add)/改(put)
  updateItem(storeName: string, data: any) {
    const store =  this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.put({
      ...data,
      updateTIme: new Date().getTime()
    })
    return new Promise((resolve, reject) => {
      request.onsuccess = (res:any) => {
        resolve(res)
        console.log('数据写入成功')
      }
      request.onerror = (err:any) => {
        reject(err)
        console.log('数据写入失败')
      }
    })
  }

  // 删
  deleteItem(storeName: string, key: number | string) {
    const store =  this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.delete(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = (res:any) => {
        resolve(res)
        console.log('删除数据成功')
      }
      request.onerror = (err:any) => {
        reject(err)
        console.log('删除数据失败')
      }
    })
  }

  // 查-所有数据
  getItems(storeName: string) {
    const store =  this.db.transaction(storeName).objectStore(storeName)
    const request = store.getAll()
    return new Promise((resolve, reject) => {
      request.onsuccess = (res:any) => {
        console.log('查所有数据成功')
        resolve(res.target.result)
      }
      request.onerror = (err:any) => {
        reject(err)
      }
    })
  }

  // 查-单一数据
  getItem(storeName: string, key: number | string) {
    const store =  this.db.transaction(storeName).objectStore(storeName)
    const request = store.get(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = (res:any) => {
        resolve(res.target.result)
        console.log('查询某一条数据成功')
      }
      request.onerror = (err:any) => {
        reject(err)
        console.log('查询某一条数据失败')
      }
    })
  }
}