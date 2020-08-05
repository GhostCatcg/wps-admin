import request from '@/utils/request'

const api = {
  create: '/pc/want/create',
  delete: '/pc/want/delete',
  update: '/pc/want/update',
  list: '/pc/want/list',
  detail: '/pc/want/detail',
  btList: '/pc/select/wantTypeList'
}
export function createBlackList (parameter) {
  return request({
    url: api.create,
    method: 'post',
    data: parameter
  })
}
// 删除轮播图
export function delJobList (parameter) {
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

// 1、banner类型下拉  post
export function bannerTypeList ({ parameter }) {
  return request({
    url: api.btList,
    method: 'post',
    data: parameter
  })
}
