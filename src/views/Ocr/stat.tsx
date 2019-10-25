/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-07-03 09:51:30
 *@description: 统计
 */
import { Vue, Component } from 'vue-property-decorator';
import { FormDataSlot } from '@/components/Form';
import { ColumnFormatter } from '@/components/Table';
import moment from 'moment';
@Component({
  components: {}
})
export default class ClassName extends Vue {
  formSlot: FormDataSlot[] = [
    {
      label: '平台名称',
      type: 'text',
      key: 'receiptId'
    },
    {
      label: '平台地址',
      type: 'date',
      key: 'receiptTime'
    }
  ];
  formItemLayout = {
    item: {
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 10
      }
    },
    button: {
      wrapperCol: { span: 14, offset: 2 }
    }
  };
  columns: Array<ColumnFormatter> = [
    {
      title: '会员ID',
      dataIndex: 'userId'
    },
    {
      title: '单号',
      dataIndex: 'receiptId'
    },
    {
      title: '金额',
      dataIndex: 'price'
    },
    {
      title: '店名',
      dataIndex: 'merchanName'
    },
    {
      title: '时间',
      dataIndex: 'receiptTime',
      scopedSlots: {
        customRender: 'time'
      },
      sorter: (a: any, b: any) => a.receiptTime - b.receiptTime,
      render: (value: any) => {
        return moment(Number(value)).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: '操作',
      dataIndex: ''
    }
  ];
  render() {
    return (
      <mk-container>
        <h1>统计</h1>
        <hr/> 
        <h2>表单</h2>
        <mk-form
          ref='editForm'
          validate={true}
          source={this.formSlot}
          itemLayout={this.formItemLayout}
        ></mk-form>
        <hr />
        <h2>表格</h2>
        <mk-table
          ref='commonTable'
          columns={this.columns}
          serviceName='getVerifyList'
        ></mk-table>
      </mk-container>
    );
  }
}
