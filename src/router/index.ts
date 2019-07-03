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
    name: 'dashboard',
    icon: 'dashboard',
    meta: { name: '总览' },
    component: () => import('@/views/Dashboard'),
  },
  {
    path: '/ocr',
    icon: 'team',
    name: 'ocr',
    component: () => import('@/components/Layout'),
    permission: true,
    redirect: '/ocr/verify',
    meta: { key: 'OCR', name: 'OCR' },
    children: [
      {
        path: 'verify',
        name: 'verify',
        component: () => import('@/views/Ocr/verify'),
        permission: true,
        meta: { key: 'OcrVerify', name: '审核' },
      },
      {
        path: 'detail',
        name: 'OcrDetail',
        component: () => import('@/views/Ocr/detail'),
        permission: true,
        hidden: true,
        meta: { key: 'OcrDetail', name: '详情', parent: { path: 'verify', name: '审核' } },
      },
      {
        path: 'stat',
        name: 'stat',
        component: () => import('@/views/Ocr/stat'),
        permission: true,
        meta: { key: 'OcrStat', name: '统计' },
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
