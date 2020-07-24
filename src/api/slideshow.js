/**
 *  轮播图接口
 */
import request from '@/utils/request'

const api = {
    create: '/pc/banner/create',
    delete: '/pc/banner/delete',
    update: '/pc/banner/update',
    list: '/pc/banner/list',
    detail: '/pc/banner/detail',
    btList: '/pc/select/bannerTypeList'
}

//  创建轮播图  post
// 	"type":10,  所属类型
// 	"name":"name1",   名称
// 	"content":"content1",  内容
// 	"pic":"679713e52cc346078e0d640b7c135fd3.jpg", 图片key
// 	"sort":1   顺序
export function createSlideShow(parameter) {
    return request({
        url: api.create,
        method: 'post',
        data: parameter
    })
}

// 删除轮播图
// 	"bannerId":1
export function delSlideShow(parameter) {
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
export function updateSlideShow(parameter) {
    return request({
        url: api.update,
        method: 'post',
        data: parameter
    })
}
// 列表
// 	"pageNum":1,    当前页
// 	"pageSize":10    页容量
export function listSlideShow(parameter) {
    return request({
        url: api.list,
        method: 'post',
        data: parameter
    })
}
// 轮播图详情
// "bannerId":"1"
export function detailSlideShow(parameter) {
    return request({
        url: api.detail,
        method: 'post',
        data: parameter
    })
}

// 1、banner类型下拉  post
export function bannerTypeList() {
    return request({
        url: api.btList,
        method: 'get'
    })
}