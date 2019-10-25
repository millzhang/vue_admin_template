/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-07-03 09:52:42
 *@description:Dashboard
 */
import { Vue, Component } from 'vue-property-decorator';
@Component({
  components: {}
})
export default class Dashboard extends Vue {
  created() {
    this.$message.success('Dashboard');
  }
  render() {
    return (
      <mk-container loading={true}>
        <h1>Ant-Design已注册全局组件：</h1>
        <a-row type='flex'>
          <a-button type='primary'>按钮</a-button>
          <a-input style='width:200px' placeholder='输入框'></a-input>
          <a-radio>男</a-radio>
          <a-checkbox>女</a-checkbox>
        </a-row>
        <a-popover>
          <template slot='content'>
            <p>Content</p>
            <p>Content</p>
          </template>
          <a-button>popover</a-button>
          <a-time-picker></a-time-picker>
          <a-date-picker></a-date-picker>
          <a-tooltip>
            <template slot='title'>prompt text</template>
            Tooltip will show when mouse enter.
          </a-tooltip>
        </a-popover>
      </mk-container>
    );
  }
}
