# vue_admin_template

vue+vue-cli3+vue-router+vuex+typescript+jsx+ant-design-vue

### 功能列表

- [x] 登录
- [x] 记住密码
- [x] 路由菜单
- [x] 面包屑路由
- [x] 路由权限
- [x] 三级隐藏子菜单
- [x] 注销
- [] 国际化
- [x] 用户信息缓存
- [] 全局组件加载状态
- [] Tab 页签缓存
- [] Tab 开关

## 使用指南

### 全局组件

1. 页面容器组件(带loading)

```html
<!-- 带有全局的loading属性 -->
<mk-container></mk-container>
```
属性：

- `loading:boolean`:是否启动全局加载


2. 通用弹框组件

```html
<mk-dialog></mk-dialog>
```

属性：

- `show:boolean`：是否显示弹框
- `mask:boolean`: 是否显示遮罩层
- `slotName:string`: 插槽名称，默认是`default`
- `full:boolean`:是否全屏显示，默认`false`

方法：

- `close`: 关闭弹框回调
- `submit`: 弹框点击确认按钮回调

3. 通用表格组件


```html
<mk-table></mk-table>
```

4. 通用表单组件

```html
<mk-form></mk-form>
```

属性：

方法：
