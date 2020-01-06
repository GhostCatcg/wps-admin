/*
*  @Author: GhostCat
*  @Date: 2020-01-03 20:28:14
*  @Description: 公司管理路由
*/

import {
    CompanyPage,
} from '@/views/company'
export default [
    {
        path: '/company',
        name: 'company',
        component: CompanyPage,
        meta: {
            title: '公司',
            index: 0,
        },
    },
]