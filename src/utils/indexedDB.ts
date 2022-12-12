export default class DB {
  private dbName:string
  private db:any
  constructor(dbName:string) {
    this.dbName = dbName
  }
  // 打开数据库
  public openStore(storeName:string, keyPath:string, indexs?:Array<string>) {
    const request = window.indexedDB.open(this.dbName, 1) // 参数:数据库名称，数据库版本，默认为1
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        this.db = event?.target?.result
        console.log('数据库打开成功', event)
        resolve(true)
      }
      request.onerror = error => {
        reject(error)
        console.log('数据库打开失败', error)
      }
      request.onupgradeneeded = event => {
        console.log('数据库升级成功', event)
        const { result }:any = event.target
        // 创建数据仓库对象
        const store = result.createObjectStore(storeName, {
          autoIncrement: true,
          keyPath: keyPath,
        })
        // 创建索引
        indexs?.map((v:string) => {
          store.createIndex(v, v, { unique: true }) // 参数: 索引名称，索引属性，配置对象
        })
        
        store.transaction.oncomplete = (event:any) => {
          console.log('store创建完成', event)
        }
      }
    })
  }

  // 增(add)/改(put)
  updateItem(storeName: string, data: any) {
    const store =  this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.put(data)
    return new Promise((resolve, reject) => {
      request.onsuccess = (res:any) => {
        resolve(res)
        console.log('数据写入成功', res)
      }
      request.onerror = (err:any) => {
        reject(err)
        console.log('数据写入失败', err)
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
        console.log('删除数据成功', res)
      }
      request.onerror = (err:any) => {
        reject(err)
        console.log('删除数据失败', err)
      }
    })
  }

  // 查-所有数据
  getItems(storeName: string) {
    const store =  this.db.transaction(storeName).objectStore(storeName)
    const request = store.getAll()
    return new Promise((resolve, reject) => {
      request.onsuccess = (res:any) => {
        console.log('查所有数据成功',res.target.result)
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
        console.log('查询某一条数据成功', res)
      }
      request.onerror = (err:any) => {
        reject(err)
        console.log('查询某一条数据失败', err)
      }
    })
  }
}