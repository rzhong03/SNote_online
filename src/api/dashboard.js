import $axios from './index'

//putTest
export function putTest(data) {
  const url = '/putTest'
  return $axios.put(url, data)
}

//deleteTest1
export function deleteTest(data) {
  const url = '/deleteTest'
  return $axios.delete(url,data)
}

//deleteTest2
export function deleteTest2(data) {
  const url = '/deleteTest'
  return $axios.delete_2(url,data)
}

//getTest
export function getTest(data) {
  const url = '/getTest'
  return $axios.get(url,data)
}




