import TypeObjectStore from '../type' // 引入类型别名

const webOrder: TypeObjectStore =
{
  keyPath: 'code',
  index: ['name', 'minPrice', 'imgUrl']
}

const orderObjectStore =
{
  web_order: webOrder
}

export default orderObjectStore
