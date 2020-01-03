/*
*  @Author: GhostCat
*  @Date: 2020-01-03 20:28:14
*  @Description: 导出所有路由
*/

import Index from '@/views/index' // 首页
import NotFound from '@/views/404' // 404页面

import authRoutes from './auth.routes'


const rootRoute = {
    path: '/',
    name: 'index',
    component: Index,
    // 重定向到项目列表页
}

export default [
    rootRoute,
    ...authRoutes,
    // 兜底 404 页面
    {
        name: 'NotFound',
        path: '*',
        component: NotFound,
    },
]