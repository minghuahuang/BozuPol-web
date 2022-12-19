import { InjectionKey } from 'vue'  
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { savaLanguage } from '@/api/layout'

type stateType = {
  locale: any,
  userStatus: number, 
}

export const key: InjectionKey<Store<stateType>> = Symbol('storekey')

export const store = createStore({
  state: {
    locale: null,
    userStatus: 0,
  },
  mutations: {
    setLanguage(state, params) {
      state.locale = params
    },
    setUserStatus(state, params) {
      state.userStatus = params
    }
  },
  actions: {
    fetchLanguageSave({ commit }, language: any) {
      savaLanguage(language.name).then((res) => {
        if (res.code === 200) {
          commit('setLanguage', language)
        }
      });
    }
  }
})

export function useStore() {
  return baseUseStore(key)
}