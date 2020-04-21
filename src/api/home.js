import { axios } from '@/utils/request'

const api = {
  create: '/pc/banner/create',
  delete: '/pc/banner/delete',
  update: '/pc/part/update',
  upload: '/pc/upload/upload',
  list: '/pc/banner/list',
  detail: '/pc/banner/detail'
}
//  创建轮播图  post
// 	"type":10,  所属类型
// 	"name":"name1",   名称
// 	"content":"content1",  内容
// 	"pic":"679713e52cc346078e0d640b7c135fd3.jpg", 图片key
// 	"sort":1   顺序
export function createSlideShow (parameter) {
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
export function updateSlideShow (parameter) {
  return axios({
    url: api.update,
    method: 'post',
    data: parameter
  })
}
// 上传图片：  post
export function uploadSlideShow (parameter) {
  return axios({
    url: api.upload,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 列表
// 	"pageNum":1,    当前页
// 	"pageSize":10    页容量
export function listSlideShow (parameter) {
  return axios({
    url: api.list,
    method: 'post',
    data: parameter
  })
}
// 详情

// 轮播图详情
// http://49.235.146.76:8020/pc/banner/detail
// 	"bannerId":"1"
export function detailSlideShow ({ parameter }) {
  return axios({
    url: api.detail,
    method: 'post',
    data: parameter
  })
}

// 1、banner类型下拉  post
// http://49.235.146.76:8020/pc/select/bannerTypeList
// {
// }
// 3、修改轮播图  post
// http://49.235.146.76:8020/pc/banner/update
// {
// 	"bannerId":1,    主键ID
// 	"type":10,
// 	"name":"name1",
// 	"content":"content1",
// 	"pic":"719713e52cc346078e0d640b7c135fd3.jpg",
// 	"sort":1
