import { axios } from '@/utils/request'

const api = {
  create: '/pc/part/create',
  update: '/pc/part/update',
  upload: '/pc/upload/upload',
  list: '/pc/part/list',
  detail: '/pc/part/detail'
}

// 创建轮播图  post
// 	"area":10,   区域  默认传10
// 	"pic":["679713e52cc346078e0d640b7c135fd3.jpg","b24c6fee914f4ffdb9350a330f4091f3.jpg","285bc5f434bb4aa3858c72311f1985c2.jpg"],  图片
// 	"sort":1  第几个轮播图
export function createSlideShow (parameter) {
  return axios({
    url: api.create,
    method: 'post',
    data: parameter
  })
}
// 修改轮播图  post
// 	"partId":8,    轮播图ID
// 	"pic":["789713e52cc346078e0d640b7c135fd3.jpg","b24c6fee914f4ffdb9350a330f4091f3.jpg","285bc5f434bb4aa3858c72311f1985c2.jpg"],  // 图片
// 	"sort":1  第几个轮播图
export function updateSlideShow (parameter) {
  return axios({
    url: api.update,
    method: 'post',
    data: parameter
  })
}
// 上传图片：  post
// http://49.235.146.76:8020/pc/upload/upload
// header:
// Content-Type:multipart/form-data
// token:2ebad81c-1609-4fc6-9718-5904a3a2dff9
// area:10
export function uploadSlideShow (parameter) {
  return axios({
    url: api.update,
    method: 'post',
    data: parameter,
    header: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 列表
export function listSlideShow (parameter) {
  console.log('传参', parameter)
  return axios({
    url: api.list,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 详情
// http://49.235.146.76:8020/pc/part/detail  post
// {
// 	"partId":"8"   ID
// }
export function detailSlideShow ({ parameter }) {
  return axios({
    url: api.detail,
    method: 'post',
    data: parameter
  })
}
