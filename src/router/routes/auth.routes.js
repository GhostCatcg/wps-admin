/*
*  @Author: GhostCat
*  @Date: 2020-01-03 20:28:14
*  @Description: 登录校验路由
*/

import {
    AuthPage,
} from '@/views/auth'
export default [
    {
        path: '/auth',
        name: "auth",
        component: AuthPage,
        meta: {
            title: '登录',
            index: 0,
        },
    },
]