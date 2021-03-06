import request from '@/utils/request'

const api = {
  create: '/pc/black/create',
  delete: '/pc/black/delete',
  update: '/pc/black/update',
  list: '/pc/black/list',
  detail: '/pc/black/detail',
}
// 1、创建黑名单 post
// "title":"黑名单1", 标题
// "content":"黑名单1内容", 内容
// "pic":["cc342d24fbbe4ea59fa910912ec9747e.jpg","50a92d494a764d11af959931960b05a3.jpg"],      图片 支持多张
// "sort":1 排序
export function createBlackList (parameter) {
  return request({
    url: api.create,
    method: 'post',
    data: parameter
  })
}
// 删除轮播图
// 	"bannerId":1
export function delBlack (parameter) {
  return request({
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
  return request({
    url: api.update,
    method: 'post',
    data: parameter
  })
}
// 列表
// 	"pageNum":1,    当前页
// 	"pageSize":10    页容量
export function getList (parameter) {
  console.log(parameter)
  // return false
  return request({
    url: api.list,
    method: 'post',
    data: parameter
  })
}
// 轮播图详情
// "bannerId":"1"
export function detailSlideShow ({ parameter }) {
  return request({
    url: api.detail,
    method: 'post',
    data: parameter
  })
}
