/**
 * 拉黑用户
 */

import request from '@/utils/request'

const api = {
  userList: '/pc/user/list', // 用户列表
  userStart: '/pc/user/start', // 拉黑不拉黑
  startStopList: '/pc/select/startStopList', // 停用启用状态（即拉黑、不拉黑） post
}
export function userList(parameter) {
  return request({
    url: api.userList,
    method: 'post',
    data: parameter
  })
}
export function userStart(parameter) {
  return request({
    url: api.userStart,
    method: 'post',
    data: parameter
  })
}
export function startStopList(parameter) {
  return request({
    url: api.startStopList,
    method: 'post',
    data: parameter
  })
}