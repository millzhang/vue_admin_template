import Vue from 'vue'
import {
  Alert,
  Button,
  Breadcrumb,
  Calendar,
  Card,
  Col,
  Collapse,
  Checkbox,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  List,
  message,
  Modal,
  Menu,
  notification,
  Pagination,
  Popover,
  Radio,
  Row,
  Rate,
  Select,
  Spin,
  Table,
  Tabs,
  TimePicker,
  Tooltip
} from 'ant-design-vue';


Vue.use(Alert);
Vue.use(Button);
Vue.use(Calendar);
Vue.use(Card);
Vue.use(Collapse);
Vue.use(Col);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(List);
Vue.use(Modal);
Vue.use(Menu);
Vue.use(Pagination);
Vue.use(Popover);
Vue.use(Radio);
Vue.use(Rate);
Vue.use(Row);
Vue.use(Select);
Vue.use(Spin);
Vue.use(Table);
Vue.use(Tabs);
Vue.use(TimePicker);
Vue.use(Tooltip);
Vue.use(Breadcrumb);

Vue.component('a-tabs-pane', Tabs.TabPane)
Vue.component('a-submenu', Menu.SubMenu)


Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;