import $axios from './index'
import * as Mock from "mockjs";

//登录用户
export function login(data) {
   const url = '/auth'
  //const url = '/login'
  return $axios.post(url, data)
}
//注册用户
export function register(data) {
  const url = '/auth'
  return $axios.put(url, data)
}
//用户信息
export function getInfo() {
  const url = '/user'
  //const url='/getInfo'
  return $axios.get(url)
}

var Random = Mock.Random
