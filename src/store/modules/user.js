import { login, getInfo } from '@/api/login'
import { Message } from 'element-ui'
import router, { resetRouter } from '@/router'

const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '', // 认证凭证'
  userName: '',
  roles: [],
  introduce: '',
  //用户id
  usrId:''
}
const mutations = {
  SET_TOKEN(state, val) {
    state.token = val
    localStorage.setItem('token', val)
  },
  DEL_TOKEN(state) {
    state.token = ''
    state.userName = ''
    state.roles = ''
    state.introduce = ''
    localStorage.removeItem('token')
  },
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_NAME(state, payload) {
    state.userName = payload
  },
  SET_INTRODUCE(state, payload) {
    state.introduce = payload
  },
  //存储usrID
  SET_USRID(state, payload) {
    state.usrId = payload
  }
}
const actions = {
  // user login
  _login({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      login(formdatas)
        .then(res => {
         // if (res.code === 0) {
           // if (res.data.success) {
             // Message.success('Success!')
             //debugger;
              commit('SET_TOKEN', res.token)
        //   } else {
           //   Message.error('Failed!')
        // }
            resolve(res)
         // }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loginOut({ commit }) {
    commit('DEL_TOKEN')
    resetRouter()
    router.push({
      path: '/login',
      query: {
        redirect: '/'
      }
    })
  },
  _getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      //debugger;
      getInfo()
        .then(res => {
          //if (res.code === 0) {
            //debugger;
            //console.log(res.username)
            //const name = res.username
           // console.log(name)
            const roles = ["Home"]
            commit('SET_ROLES', roles)
            commit('SET_NAME', res.username)
            commit('SET_USRID', res.id)
            commit('SET_INTRODUCE', " ")
         // } else {
           // Message.error(res.msg)
         // }
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
