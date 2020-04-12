import $axios from './index'
import * as Mock from "mockjs";

//当前用户的笔记本列表(不传参版本)
export function getNotebookList() {
  const url = '/notebook'
  return $axios.get(url)
}

//当前用户的笔记本列表(传参版本)
// export function getNotebookList(data) {
//   const url = '/notebook'
//   return $axios.get(url,data)
// }

//新增笔记本
export function addNoteBook(data) {
  const url = '/notebook'
  return $axios.put(url, data)
}

//删除笔记本
export function deleteNoteBook(data) {
  const url = '/notebook'
  return $axios.delete(url,data)
}

//编辑笔记本
export function modifyNoteBook(data) {
  const url = '/notebook'
  return $axios.patch(url,data)
}