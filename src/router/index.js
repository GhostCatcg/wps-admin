/*
*  @Author: GhostCat
*  @Date: 2020-01-03 20:28:14
*  @Description: 路由入口
*/

import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'


Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    routes,
})

// 注册守卫
// registerBeforeGuard(router)
// registerAfterGuard(router)

export default router