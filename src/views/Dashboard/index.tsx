/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-07-03 09:52:42
 *@description:Dashboard
 */
import { Vue, Component } from 'vue-property-decorator';
import { Card } from 'ant-design-vue';
@Component({
  components: {
    'a-card': Card
  }
})
export default class Dashboard extends Vue {
  created() {
    this.$message.success('Dashboard');
    this.$notification.success({
      message: 'Welcome',
      description: ''
    });
  }
  render() {
    return (
      <div class="container">
        <a-card class="cardbox">
          <h1>Dashboard</h1>
        </a-card>
      </div>
    );
  }
}
