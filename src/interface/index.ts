/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-06-21 18:43:34
 *@description:  typescript interface
*/
export interface routerItem {
  name?: string,
  component?: any,
  path: string,
  icon?: string,
  hidden?: boolean,
  permission?: string | string[] | boolean,
  redirect?: string | object,
  children?: routerItem[],
  meta?: any,
}

export interface menuItem {
  id: number,
  title: string,
  url?: string,
  icon?: string,
  permission: string | Array<string> | boolean,
  children?: Array<menuItem>,
}