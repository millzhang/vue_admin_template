/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-06-21 21:33:21
 *@description:  路由权限/刷新状态管理
*/

import router from './index'
import store from '@/store'
import { getToken } from '@/assets/utils'

let flag: boolean = true;
// 跳过验证的白名单
const WHITE_LIST = ['/login']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (!store.state.app.menuData.length && flag) { // 判断是否获取到菜单数据,并且只执行一次
      flag = false;
      store.dispatch('getUserInfo').then(() => {
        const toPath = WHITE_LIST.indexOf(`#${to.path}`) > -1 ? '/dashboard' : to.path;
        next({
          path: toPath,
          query: to.query,
          params: to.params,
          replace: true,
        });
      }).catch((err) => {
        console.log(err);
        if (WHITE_LIST.indexOf(to.path) < 0) {
          next({ name: 'login', replace: true });
        }
        next();
      });
    }
    next();
  } else {
    if (to.path == '/login') {
      //如果是登录页面路径，就直接next()
      next()
    } else {
      //不然就跳转到登录；
      next('/login')
    }
  }
});