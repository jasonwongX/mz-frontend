// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout,PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/insignt/my',
    children: [
      // dashboard
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   component: () => import('@/views/dashboard/Workplace'),
      //   meta: { title: '首页', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] }
      // },

      {
        path: '/insignt',
        name: 'insignt',
        redirect: '/insignt/my',
        component: RouteView,
        meta: { title: '效能洞察', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/insight/indicator',
            name: 'indicator',
            component: () => import('@/views/insight/Indicator'),
            meta: { title: '指标库', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/insight/index',
            name: 'InsigntIndex',
            component: () => import('@/views/insight/modules/InsightViewLayout'),
            redirect: '/insignt/my',
            meta: { title: '洞察视图', keepAlive: true, permission: ['table'] },
            children: [
              {
                path: '/insignt/my/:pageNo([1-9]\\d*)?',
                name: 'myInsight',
                component: () => import('@/views/insight/MyInsight'),
                meta: { title: '个人视图', keepAlive: false, permission: ['dashboard'] }
              },
              {
                path: '/insignt/team/:pageNo([1-9]\\d*)?',
                name: 'teamInsight',
                component: () => import('@/views/insight/TeamInsight'),
                meta: { title: '团队视图', keepAlive: false, permission: ['dashboard'] }
              },
              {
                path: '/insignt/company/:pageNo([1-9]\\d*)?',
                name: 'companyInsight',
                component: () => import('@/views/insight/CompanyInsight'),
                meta: { title: '组织视图', keepAlive: false, permission: ['dashboard'] }
              }
            ]
          },
          {
            path: '/metric-report',
            name: 'MetricReport',
            component: () => import('@/views/insight/MetricReport'),
            meta: { title: '度量报表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/metric-report/detailView',
            name: 'MetricReportDetail',
            component: () => import('@/views/insight/MetricReportView'),
            hidden: true,
            meta: { title: '度量报表结果', keepAlive: true, permission: ['table'] }
          }
      ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        hidden: true,
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: 'menu.account.center', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: 'account.settings.menuMap.security',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              }
            ]
          }
        ]
      },

      // system setting
      {
        path: '/settings',
        name: 'settings',
        component: RouteView,
        meta: { title: '基础信息管理', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/settings/project-list',
        children: [
          {
            path: '/settings/project-list/:pageNo([1-9]\\d*)?',
            name: 'ProjectList',
            component: () => import('@/views/settings/ProjectList'),
            meta: { title: '项目列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/settings/key-project/:pageNo([1-9]\\d*)?',
            name: 'KeyProject',
            component: () => import('@/views/settings/KeyProjectList'),
            meta: { title: '重点工程管理', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/settings/key-project/edit',
            name: 'EditKeyProject',
            hidden: true,
            component: () => import('@/views/settings/modules/EditKeyProject'),
            meta: { title: '添加项目', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/settings/project-list/detail',
            name: 'ProjectDetail',
            hidden: true,
            component: () => import('@/views/settings/modules/ProjectDetail'),
            meta: { title: '项目详情', permission: ['profile'] }
          },
          {
            path: '/settings/key-project/detail',
            name: 'ProjectDetail',
            hidden: true,
            component: () => import('@/views/settings/modules/KeyProjectDetail'),
            meta: { title: '重点工程详情', permission: ['profile'] }
          },
          {
            path: '/settings/user-list',
            name: 'UserList',
            component: () => import('@/views/settings/UserList'),
            meta: { title: '用户列表', keepAlive: true }
          },
          {
            path: '/settings/role-list',
            name: 'RoleList',
            component: () => import('@/views/settings/RoleList'),
            meta: { title: '角色列表', keepAlive: true }
          },
          {
            path: '/settings/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/settings/PermissionList'),
            meta: { title: '权限列表', keepAlive: true }
          }
        ]
      }

      // other
      /**
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'dashboard' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
