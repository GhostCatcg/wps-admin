/*
*  @Author: GhostCat
*  @Date: 2020-01-03 20:28:14
*  @Description: 人员管理
*/

import {
    PeoplePage,
} from '@/views/people'
export default [
    {
        path: '/people',
        name: "people",
        component: PeoplePage,
        meta: {
            title: '人员管理',
            index: 0,
        },
    },
]