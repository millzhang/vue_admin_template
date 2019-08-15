/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-06-21 18:42:05
 *@description:  公共方法类
*/

import Cookies from 'js-cookie'

const ENCRY_TIMES = 5

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



function encry(str: string, index: number = 1): string {
  let r = window.btoa(str);
  if (index > ENCRY_TIMES) {
    return r;
  }
  return encry(r, index + 1);
}

function decrypt(str: string, index: number = 1): string {
  let r = window.atob(str);
  if (index > ENCRY_TIMES) {
    return r;
  }
  return decrypt(r, index + 1);
}

export function userCache() {
  let KEY = window.btoa('__zy$vueadmin$REMEMBERMEinfo__')
  return {
    get() {
      let userInfo = localStorage.getItem(KEY)
      if (userInfo) {
        return JSON.parse(decrypt(userInfo))
      }
      return null
    },
    set(info: any) {
      localStorage.setItem(KEY, encry(JSON.stringify(info)))
    },
    remove() {
      localStorage.removeItem(KEY)
    }
  }
}

export function userToken() {
  let KEY = window.btoa('__zy$vueadmin$LOGINTOKENinfo__')
  return {
    set(token: string = Date.now().toString()) {
      Cookies.set(KEY, token)
    },
    get() {
      return Cookies.get(KEY)
    },
    remove() {
      Cookies.remove(KEY)
    }
  }

}

export function parseDate(value: any, fmt: string = 'yyyy-MM-dd hh:mm:ss') {
  let date = new Date(value)
  let o: any = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

export interface UtilInterface {
  routeToArray: Function,
  userCache: Function,
  userToken: Function,
  parseDate: Function
}