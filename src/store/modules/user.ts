/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-06-21 18:35:37
 *@description:   用户状态管理
*/
import { getToken } from '@/assets/utils'
import router, { asyncRouterMap, constantRouterMap } from '@/router';
import { routerItem } from '@/interface';


function filterAsyncRouter(
  AsyncRouterMap: routerItem[],
  permission: string[],
): routerItem[] {
  const routerMap = AsyncRouterMap.filter((item) => {
    if (typeof item.permission === 'string') {
      return permission.indexOf(item.permission) > -1;
    } if (item.permission instanceof Array) {
      const filter = item.permission.filter(items => permission.indexOf(items) > -1);
      if (filter.length && item.children) {
        item.children = filterAsyncRouter(item.children, permission);
      }
      return filter.length;
    }
    return item.permission;
  });
  return routerMap;
}

const hasPermission = (permission: string[]) => { // 过滤路由
  const filterRouter = filterAsyncRouter(asyncRouterMap, permission);
  // 添加路由的时候排除掉dashboard
  router.addRoutes(filterRouter);
  return filterRouter;
};

export default {
  state: {
    user: {},
    roles: []
  },
  mutations: {
    SAVEROLES: (state: any, roles: Array<any>) => {
      state.roles = roles;
    },
    SAVE_USERINFO(state: any, userdata: object) {
      state.user = userdata
    }
  },
  actions: {
    getUserInfo: (context: any) => {
      return new Promise((resolve, reject) => {
        // do some fetch
        let token = getToken()
        // 此处应有服务端返回
        let userData = { name: 'admin' }
        // let permissions = []
        context.commit('SAVE_USERINFO', userData);
        // context.commit('SAVEROLES', permissions);
        // const getRouter = hasPermission(permissions.permission);
        context.dispatch('GetMenuData', constantRouterMap);
        resolve();
      })
    }
  }
}