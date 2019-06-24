import Vue from 'vue'
import Router from 'vue-router'
import { routerItem } from '@/interface'

// 同步路由
export const constantRouterMap: routerItem[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
      layout: 'no'
    },
    component: () => import('@/views/Login'),
  },
  {
    path: '/dashboard',
    name: '总览',
    icon: 'dashboard',
    component: () => import('@/views/Dashboard'),
  },
  {
    path: '/ocr',
    icon: 'team',
    name: 'OCR小票识别',
    component: () => import('@/components/Layout'),
    permission: true,
    meta: { key: 'OCR' },
    children: [
      {
        path: 'verify',
        name: '积分审核',
        component: () => import('@/views/Ocr/verify'),
        permission: true,
        meta: { key: 'OcrVerify' },
      },
      {
        path: 'stat',
        name: '数据统计',
        component: () => import('@/views/Ocr/stat'),
        permission: true,
        meta: { key: 'OcrStat' },
      },
    ],
  }
]

// 异步路由
export const asyncRouterMap: routerItem[] = [

]

Vue.use(Router)

export default new Router({
  routes: constantRouterMap
})
