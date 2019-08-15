/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-06-21 18:35:47
 *@description:  项目全局状态管理
*/
import { menuItem, routerItem } from '@/interface';
export default {
  state: {
    sidebar: {
      opened: localStorage.getItem('sidebarStatus') ? localStorage.getItem('sidebarStatus') : 1
    },
    theme: 'default',
    menuData: []
  },
  mutations: {
    TOGGLE_SIDEBAR: (state: any) => {
      localStorage.setItem('sidebarStatus', state.sidebar.opened ? '1' : '0');
      state.sidebar.opened = !state.sidebar.opened;
    },
    SAVE_MENU: (state: any, menuData: routerItem[]) => {
      state.menuData = menuData;
    },
  },
  actions: {
    ToggleSideBar: (context: any) => {
      context.commit('TOGGLE_SIDEBAR');
    },
    GetMenuData: (context: any, menuData: routerItem[]) => {
      context.commit('SAVE_MENU', menuData);
    },
  }
}