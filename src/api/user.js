import request from '@/utils/request'

const url = {
  Login: '/pc/login/login', // 登录
  Logout: '/pc/login/logout', // 退出
  GetRoutes: '/pc/auth/menuTree' // 获取左侧菜单树结构
}

export function login(data) {
  return request({
    url: url.Login,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
