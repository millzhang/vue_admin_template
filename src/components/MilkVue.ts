import Vue from 'vue'
//导入自定义组件
import MilkContainer from '@/components/Section';
import MilkDialog from '@/components/Dialog';
import MilkTable from '@/components/Table'
import MilkForm from '@/components/Form'


// 自定义的全局组件
Vue.component('mk-container', MilkContainer)
Vue.component('mk-dialog', MilkDialog)
Vue.component('mk-table', MilkTable)
Vue.component('mk-form', MilkForm)