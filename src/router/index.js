import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () =>
      import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () =>
      import('@/views/404'),
    hidden: true
  },
  {
    path: '/md',
    component: () =>
      import('@/views/md/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/slideshow',
    children: [{
      path: 'slideshow',
      name: 'slideshow',
      component: () =>
        import('@/views/slideshow/index'),
      meta: {
        title: '轮播图',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: 'black',
    component: Layout,
    children: [{
      path: '/black',
      name: 'black',
      component: () =>
        import('@/views/black/index'),
      meta: {
        title: '小黑屋',
        icon: 'el-icon-s-finance'
      }
    }]
  },
  {
    path: 'idea',
    component: Layout,
    children: [{
      path: '/idea',
      name: 'idea',
      component: () =>
        import('@/views/idea/index'),
      meta: {
        title: '奇思妙想',
        icon: 'el-icon-info'
      }
    }]
  },
  // {
  //   path: 'complaining',
  //   component: Layout,
  //   children: [{
  //     path: '/complaining',
  //     name: 'complaining',
  //     component: () =>
  //       import('@/views/complaining/index'),
  //     meta: {
  //       title: '匿名吐槽',
  //       icon: 'el-icon-s-help'
  //     }
  //   }]
  // },
  {
    path: 'outsourcing',
    component: Layout,
    children: [{
      path: '/outsourcing',
      name: 'outsourcing',
      component: () =>
        import('@/views/outsourcing/index'),
      meta: {
        title: '外包消息',
        icon: 'el-icon-message-solid'
      }
    }]
  },
  {
    path: 'job',
    component: Layout,
    children: [{
      path: '/job',
      name: 'job',
      component: () =>
        import('@/views/job/index'),
      meta: {
        title: '职位',
        icon: 'el-icon-s-check'
      }
    }]
  },
  {
    path: 'jobSearch',
    component: Layout,
    children: [{
      path: '/jobSearch',
      name: 'jobSearch',
      component: () =>
        import('@/views/jobSearch/index'),
      meta: {
        title: '求职',
        icon: 'el-icon-aim'
      }
    }]
  },

  {
    path: 'trainee',
    component: Layout,
    children: [{
      path: '/trainee',
      name: 'trainee',
      component: () =>
        import('@/views/trainee/index'),
      meta: {
        title: '练习生',
        icon: 'el-icon-edit'
      }
    }]
  },
  {
    path: 'demo',
    component: Layout,
    children: [{
      path: '/demo',
      name: 'demo',
      component: () =>
        import('@/views/demo/index'),
      meta: {
        title: '作品展示',
        icon: 'el-icon-picture'
      }
    }]
  },
  {
    path: 'part',
    component: Layout,
    children: [{
      path: '/part',
      name: 'part',
      component: () =>
        import('@/views/part/index'),
      meta: {
        title: '社区',
        icon: 'el-icon-office-building'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
