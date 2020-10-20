/**
 * 公用接口
 * @param parameter
 * @returns {*}
 */

import axios from '@/utils/request'

const api = {
  upload: '/pc/upload/upload',
  updateHour: "/pc/config/updateHour", // 开启/关闭 审核状态
  btList: '/pc/select/bannerTypeList',
  searchKeyWord: '/pc/search/keyWord'

}
// 上传图片
export function uploadImg(parameter) {
  return axios({
    url: api.upload,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function updateHour() {
  return axios({
    url: api.updateHour,
    method: 'get',
  })
}

// banner类型下拉 
export function bannerTypeList() {
  return axios({
    url: api.btList,
    method: 'get',
  })
}

// 全局搜索
export function searchKeyWord(parameter) {
  return axios({
    url: api.searchKeyWord,
    method: 'post',
    data: parameter
  })
}
