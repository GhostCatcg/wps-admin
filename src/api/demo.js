/**
 * 作品展示 请求接口
 */

import { axios } from '@/utils/request'

const api = {
  create: '/pc/opus/create',
  delete: '/pc/opus/delete',
  update: '/pc/opus/update',
  list: '/pc/opus/list',
  detail: '/pc/opus/detail', // 作品详情
  btList: '/pc/select/opusTypeList',
  cream: '/pc/opus/cream' // 优选作品，会到首页推荐位置
}

export function creamDemo (parameter) {
  return axios({
    url: api.cream,
    method: 'post',
    data: parameter
  })
}
export function createBlackList (parameter) {
  return axios({
    url: api.create,
    method: 'post',
    data: parameter
  })
}
// 删除轮播图
// 	"bannerId":1
export function delSlideShow (parameter) {
  return axios({
    url: api.delete,
    method: 'post',
    data: parameter
  })
}
// 3、修改轮播图  post
// 	"bannerId":1,    主键ID
// 	"type":10,
// 	"name":"name1",
// 	"content":"content1",
// 	"pic":"719713e52cc346078e0d640b7c135fd3.jpg",
// 	"sort":1
export function updateSlideShow (parameter) {
  return axios({
    url: api.update,
    method: 'post',
    data: parameter
  })
}
// 列表
// 	"pageNum":1,    当前页
// 	"pageSize":10    页容量
export function getList (parameter) {
  return axios({
    url: api.list,
    method: 'post',
    data: parameter
  })
}
// 轮播图详情
// "bannerId":"1"
export function detailSlideShow ({ parameter }) {
  return axios({
    url: api.detail,
    method: 'post',
    data: parameter
  })
}

// 1、banner类型下拉  post
export function bannerTypeList ({ parameter }) {
  return axios({
    url: api.btList,
    method: 'post',
    data: parameter
  })
}
