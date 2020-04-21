import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification' // 提示
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import router from '@/router'

// 创建 axios 实例
// console.log('request.js', process.env.VUE_APP_API_BASE_URL)
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // 基础的RUL
  timeout: 6000, // 请求超时时间
  headers: {
    area: 20, // 请求默认区域（公司残留）
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
const err = (error) => {
  console.log(error)
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
    return Promise.reject(error)
  } else {
    notification.error({
      message: '网络链接失败',
      description: '请重试'
    })
    localStorage.clear()
    router.push('/user/login')
    return false
    // throw Error(err)
  }
}

/**
 * // request interceptor 发送请求时拦截
 */
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)
/**
 * // request interceptor 返回数据时拦截
 */
service.interceptors.response.use((response) => {
  if (response.data.code === 0) {
    return response.data
  } else if (response.data.code === 110) {
    // 110为登录超时，清空localStorage 进入登录页面
    notification.error({
      message: '登录超时',
      description: '请重新登录'
    })
    localStorage.clear()
    router.push('/user/login')
  } else {
    notification.error({
      message: '错误代码' + response.data.code,
      description: response.data.msg
    })
    throw Error(response.data.msg)
  }
}, err)
const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
