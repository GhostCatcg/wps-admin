import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */

const api = {
  Login: '/pc/login/login', // 登录
  Logout: '/pc/login/logout', // 退出
  GetRoutes: '/pc/auth/menuTree' // 获取左侧菜单树结构
}
export function login (parameter) {
  return axios({
    url: api.Login,
    method: 'post',
    data: parameter
  })
}
export function getRoutes () {
  return axios({
    url: api.GetRoutes,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {}
  })
}
export function logout () {
  return axios({
    url: api.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {}
  })
}
