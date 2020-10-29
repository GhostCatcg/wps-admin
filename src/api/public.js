/**
 * 公用接口
 * @param parameter
 * @returns {*}
 */

import axios from '@/utils/request'

const api = {
  upload: '/pc/upload/upload',
  updateHour: "/pc/config/updateHour", // 开启/关闭 审核状态
  btList: '/pc/select/bannerTypeList', // 轮播图类型
  searchKeyWord: '/pc/search/keyWord', // 去安居搜索
  listTopicTree: "/pc/invit/listTopicTree", // 获取评论树
  delTopic: "/pc/invit/delTopic", // 删除评论
  deleteArticle: "/pc/invit/delete", // 删除帖子
}


// 获取评论树 
export function listTopicTree(parameter) {
  return axios({
    url: api.listTopicTree,
    method: 'post',
    data: parameter,
  })
}
// 删除评论 
export function delTopic(parameter) {
  return axios({
    url: api.delTopic,
    method: 'post',
    data: parameter,
  })
}
// 删除帖子
export function deleteArticle(parameter) {
  return axios({
    url: api.deleteArticle,
    method: 'post',
    data: parameter,
  })
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
