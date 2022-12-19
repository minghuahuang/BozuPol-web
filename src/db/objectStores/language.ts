import TypeObjectStore from "../type";

const webLang: TypeObjectStore = {
  keyPath: 'id',
  index: ['name'],
}

const languageObjectStore = {
  language: webLang
}

export default languageObjectStore
