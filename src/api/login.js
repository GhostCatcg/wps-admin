/**
 * 登录接口
 */
import request from '@/utils/request'

const api = {
  Login: '/pc/login/login', // 登录
  Logout: '/pc/login/logout', // 退出
  GetRoutes: '/pc/auth/menuTree' // 获取左侧菜单树结构
}

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}


export function login(parameter) {
  return request({
    url: api.Login,
    method: 'post',
    data: parameter
  })
}
export function logout() {
  return request({
    url: api.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {}
  })
}