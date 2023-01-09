import { InjectionKey } from 'vue'  
import { createStore as _createStore, Store, useStore as baseUseStore } from 'vuex'
import { savaLanguage } from '@/api/layout'
import { fetchRoomList } from '@/api/home'
import { fetchRoomDetail } from '@/api/detail'
import type { RoomListParamsType, RoomDetailParamsType } from '@/api/type'

type stateType = {
  locale: any,
  userStatus: number, 
  roomList: Array<any>,
  pageNum: number,
  pageSize: number,
  total: number,
  city: string,
  cityCode: string,
  code: string,
  detail: any,
  showOrder: boolean,
}

export const key: InjectionKey<Store<stateType>> = Symbol('storekey')

export function createStore() {
  return _createStore<stateType>({
    state: {
      locale: null,
      userStatus: 0,
      roomList: [],
      pageNum: 1,
      pageSize: 6,
      total: 0,
      city: '北京',
      cityCode: '110100',
      code: '',
      detail: {},
      showOrder: false
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
      },
      setPageNum(state, params) {
        state.pageNum = params
      },
      setPageSize(state, params) {
        state.pageSize = params
      },
      setTotal(state, params) {
        state.total = params
      },
      setCity(state, params) {
        state.city = params
      },
      setCityCode(state, params) {
        state.cityCode = params
      },
      setCode(state, params) {
        state.code = params
      },
      setDetail(state, params) {
        state.detail = params
      },
      setShowOrder(state, params) {
        state.showOrder = params
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
      // 列表接口
      getRoomList({ commit }, params: RoomListParamsType) {
        const { pageNum } = params
        commit('setPageNum', pageNum)
        const argus = {
          ...params,
          pageSize: 6,
        }
        return new Promise((resolve) => {
          fetchRoomList(argus).then(res => {
            const { code, data } = res
            if(code == 'success') {
              commit('setRoomList', data)
              commit('setTotal', 18) // 接口未返回总条数，设置18条，分3页
              resolve(true)
            }
          })
        })
      },
      // 详情接口
      getRoomDetail({ commit }, params: RoomDetailParamsType) {
        const { code } = params
        return new Promise((resolve) => {
          fetchRoomDetail({ code }).then(res => {
            const { code, data } = res
            if(code == 'success') {
              commit('setDetail', (data as any).parkInfo)
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