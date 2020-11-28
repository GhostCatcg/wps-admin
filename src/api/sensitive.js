// @GHOST CAT 敏感字PC模块
// 1、 创建敏感字 post
// https: //cgwps.com/pc/wrongWord/create
//   {
//     "name": "name1" // 敏感字
//   }

// 2、 修改敏感字 post
// https: //cgwps.com/pc/wrongWord/update
//   {
//     "wrongWordId": 6910,
//     "name": "name2"
//   }

// 3、 删除敏感字 post
// https: //cgwps.com/pc/wrongWord/delete
//   {
//     "wrongWordId": 6910
//   }

// 4、 敏感字列表 post
// https: //cgwps.com/pc/wrongWord/list
//   {
//     "name": "黄片",
//     "pageNum": 1,
//     "pageSize": 10
//   }

// 5、 敏感字详情 post
// https: //cgwps.com/pc/wrongWord/detail
//   {
//     "wrongWordId": 6910
//   }
/**
 * 公用接口
 * @param parameter
 * @returns {*}
 */

import axios from '@/utils/request'

const api = {
  wordList: '/pc/wrongWord/list', // 敏感词列表
  wordDetail: '/pc/wrongWord/detail', // 敏感词详情
  wordDelete: '/pc/wrongWord/delete', // 删除敏感词
  wordUpdate: '/pc/wrongWord/update', // 修改敏感词
  wordCreate: '/pc/wrongWord/create', // 创建敏感词
}


// 敏感词列表 
export function wordList(parameter) {
  return axios({
    url: api.wordList,
    method: 'post',
    data: parameter,
  })
}
// 敏感词详情 
export function wordDetail(parameter) {
  return axios({
    url: api.wordDetail,
    method: 'post',
    data: parameter,
  })
}
// 删除敏感词
export function wordDelete(parameter) {
  return axios({
    url: api.wordDelete,
    method: 'post',
    data: parameter,
  })
}

// 修改敏感词
export function wordUpdate(parameter) {
  return axios({
    url: api.wordUpdate,
    method: 'post',
    data: parameter,
  })
}

// 创建敏感词
export function wordCreate(parameter) {
  return axios({
    url: api.wordCreate,
    method: 'post',
    data: parameter,
  })
}
