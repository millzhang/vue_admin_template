import Vue from 'vue'
import {
  Alert,
  Button,
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

// Vue.use(Alert, 'a-alert');
// Vue.use(Button, 'a-button');
// Vue.use(Calendar, 'a-calendar');
// Vue.use(Card, 'a-card');
// Vue.use(Collapse, 'a-collapse');
// Vue.use(Col, 'a-col');
// Vue.use(Checkbox, 'a-checkbox');
// Vue.use(DatePicker, 'a-datepicker');
// Vue.use(Form, 'a-form');
// Vue.use(Icon, 'a-icon');
// Vue.use(Input, 'a-input');
// Vue.use(List, 'a-list');
// Vue.use(Modal, 'a-modal');
// Vue.use(Pagination, 'a-pagination');
// Vue.use(Popover, 'a-popover');
// Vue.use(Radio, 'a-radio');
// Vue.use(Rate, 'a-rate');
// Vue.use(Row, 'a-row');
// Vue.use(Select, 'a-select');
// Vue.use(Spin, 'a-spin');
// Vue.use(Table, 'a-table');
// Vue.use(Tabs, 'a-tabs');
// Vue.use(TimePicker, 'a-timepicker');
// Vue.use(Tooltip, 'a-tooltip');


Vue.component('a-tabs-pane', Tabs.TabPane)
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;