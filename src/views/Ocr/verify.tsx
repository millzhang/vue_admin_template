/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-07-03 09:51:06
 *@description: verify
 */
import { Vue, Component } from 'vue-property-decorator';
import { Card } from 'ant-design-vue';
@Component({
  components: {
    'a-card': Card
  }
})
export default class Verify extends Vue {
  render() {
    return (
      <div class="container">
        <a-card class="cardbox">
          <h1>审核</h1>
          <h2>
            <router-link to="/ocr/detail">详情</router-link>
          </h2>
        </a-card>
      </div>
    );
  }
}
