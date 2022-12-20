import { createI18n as _createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

export function createI18n() {
  return _createI18n({
    legacy: false,
    locale: 'zh',
    messages: {
      zh,
      en
    }
  })
}
