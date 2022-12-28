import { InjectionKey } from 'vue'  
import { createStore as _createStore, Store, useStore as baseUseStore } from 'vuex'
import { savaLanguage } from '@/api/layout'
import { fetchRoomList } from '@/api/home'

type stateType = {
  locale: any,
  userStatus: number, 
  roomList: Array<any>,
}

export const key: InjectionKey<Store<stateType>> = Symbol('storekey')

export function createStore() {
  return _createStore<stateType>({
    state: {
      locale: null,
      userStatus: 0,
      roomList: [],
    },
    mutations: {
      setLanguage(state, params) {
        state.locale = params
      },
      setUserStatus(state, params) {
        state.userStatus = params
      },
      setRoomList(state, params) {
        state.roomList = params
      }
    },
    actions: {
      fetchLanguageSave({ commit }, language: any) {
        savaLanguage(language.name).then((res) => {
          if (res.code === 200) {
            commit('setLanguage', language)
          }
        });
      },
      getRoomList({ commit }, params) {
        return new Promise((resolve) => {
          fetchRoomList().then(res => {
            const { code, data } = res
            if(code == 'success') {
              commit('setRoomList', data)
              resolve(true)
            }
          })
        })
      }
    }
  })
}

export function useStore() {
  return baseUseStore(key)
}