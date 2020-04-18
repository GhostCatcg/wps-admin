import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  console.log('路由拦截,进入之前')
  console.log('获取用户信息', store.getters.roles)
  console.log('token', Vue.ls.get(ACCESS_TOKEN))

  NProgress.start() // start progress bar  开启模拟进度条
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (Vue.ls.get(ACCESS_TOKEN)) { // 如果有token
    /* has token */
    if (to.path === '/user/login') {
      next({ path: defaultRoutePath })
      NProgress.done() // 进去条结束
    } else {
      if (store.getters.roles.length === 0) { // 暂时不获取用户信息，先进入页面
        notification.error({
          message: '提示',
          description: '获取用户路由'
        })
        console.log('获取用户路由')
        store.dispatch('CreateRoutes').then(() => {
          // 根据roles权限生成可访问的路由表
          // 动态添加可访问路由表
          router.addRoutes(store.getters.addRouters)
          // 请求带有 redirect 重定向时，登录自动重定向到该地址
          const redirect = decodeURIComponent(from.query.redirect || to.path)
          if (to.path === redirect) {
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          } else {
            // 跳转到目的路由
            next({ path: redirect })
          }
        })
        // store
        //   .dispatch('GetInfo')
        //   .then(res => {
        //     console.log('那边返回的结果', res)
        //     const roles = res.result && res.result.role
        //     store.dispatch('GenerateRoutes', { roles }).then(() => {
        //       // 根据roles权限生成可访问的路由表
        //       // 动态添加可访问路由表
        //       router.addRoutes(store.getters.addRouters)
        //       // 请求带有 redirect 重定向时，登录自动重定向到该地址
        //       const redirect = decodeURIComponent(from.query.redirect || to.path)
        //       if (to.path === redirect) {
        //         // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        //         next({ ...to, replace: true })
        //       } else {
        //         // 跳转到目的路由
        //         next({ path: redirect })
        //       }
        //     })
        //   })
        //   .catch(() => {
        //     notification.error({
        //       message: '错误',
        //       description: '请求用户信息失败，请重试'
        //     })
        //     store.dispatch('Logout').then(() => {
        //       next({ path: '/user/login', query: { redirect: to.fullPath } })
        //     })
        //   })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})