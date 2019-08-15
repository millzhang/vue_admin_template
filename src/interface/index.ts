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

/**
 * 通用表单的数据插槽
 */
export interface FormDataSlot {
  /**
    * Label
    * @description form表单label标签
    * @default ""
    * @type string
    */
  label: string;

  /**
    * Key
    * @description form表单输入框model值
    * @default ""
    * @type string
    */
  key: string;

  /**
  * Editable
  * @description form表单输入框是否可编辑
  * @default true
  * @type boolean
  */
  editable?: boolean;

  /**
  * Width
  * @description form表单输入框的宽度
  * @default ""
  * @type string
  */
  width?: string;

  /**
  * Type
  * @description form表单类型
  * @value text|select|datepicker|radio|checkbox|timepicker
  * @type string
  */
  type: string;

  /**
    * Init
    * @description 值域的初始值
    * @default ""
    * @type string
    */
  init?: any;

  /**
    * Rule
    * 不填按常用的必填规则
    * @description 校验规则
    * @default []
    * @type array
    */
  rule?: object[];

  /**
  * Validator
  * 自定义校验规则
  * @description 校验规则
  * @default ''
  * @type string
  */
  validator?: string;

  /**
  * ValidatorCompare
  * 自定义比较校验规则
  * @description 校验规则
  * @default ''
  * @type string
  */
  validatorCompare?: object;

  /**
  * ValidateMessage
  * 校验信息
  * @description 校验信息
  * @default ''
  * @type string
  */
  validateMessage?: string;

  /**
  * Options
  * 选择列表渲染数据
  * @description 该项需要渲染的数据列表
  * @default []
  * @type array
  */
  options?: object[],

  /**
  * Maxlength
  * 选择列表渲染数据
  * @description 该项需要渲染的数据列表
  * @default []
  * @type array
  */
  maxlength?: number

}