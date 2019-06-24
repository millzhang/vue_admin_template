/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-06-21 18:42:05
 *@description:  公共方法类
*/

import Cookies from 'js-cookie'

/**
 * @param  {string} route
 * @returns string
 */
export function routeToArray(route: string): { routeArr: string[], params: string } {
  if (!route) {
    return {
      routeArr: [],
      params: '',
    };
  }
  const arr: string[] = route.split('/');
  const ret: string[] = [];
  let params = '';
  arr.shift();
  arr.forEach((item, index) => {
    if (parseInt(item, 10)) {
      params = item;
      return;
    }
    ret.push(index ? item : `/${item}`);
  });
  return {
    routeArr: ret,
    params,
  };
}

export function userLogout() {
  Cookies.remove('user-token')
}

export function userLogin(token: string = Date.now().toString()) {
  return Cookies.set('user-token', token)
}


export function getToken() {
  return Cookies.get('user-token')
}