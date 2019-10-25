/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-10-25 15:37:39
 *@description: 带有Loading的块级组件
 */
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({
  name: 'MilkContainer',
  components: {}
})
export default class MilkContainer extends Vue {
  @Prop({ default: false, type: Boolean })
  private loading!: boolean;

  @Prop({ default: 'default' })
  private slotName!: any;
  render() {
    return (
      <div class='container'>
        <a-card class='cardbox'>
          <a-spin
            tip='加载中...'
            size='large'
            class='spin-content'
            spinning={this.loading}
          ></a-spin>
          {this.$slots[this.slotName]}
        </a-card>
      </div>
    );
  }
}
