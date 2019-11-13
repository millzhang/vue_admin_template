/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-08-15 14:41:21
 *@description:  通用弹出层组件
 */
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component({
  components: {
  }
})
export default class MilkDialog extends Vue {
  /**
   * 是否显示弹出层
   */
  @Prop({ default: false, type: Boolean })
  private show!: Boolean;

  /**
   * 弹框是否有遮层
   */
  @Prop({ default: true, type: Boolean })
  private mask!: Boolean;

  @Prop({ default: 'default' })
  private slotName!: any;

  /**
   * 弹出层是否全屏
   */
  @Prop({ default: false, type: Boolean })
  private full!: Boolean;

  private visiable = false;
  private menuOpened = this.$store.state.app.sidebar.opened;

  @Watch('show')
  dialogVisableListener(val: boolean) {
    this.visiable = val;
  }

  @Emit('close')
  handleClose() {}

  getWrapperName() {
    let className = ['vat-dialog'];
    if (this.full) {
      className.push('full');
    }
    if (!this.menuOpened) {
      className.push('wider');
    }
    return className.join(' ');
  }

  render() {
    this.menuOpened = this.$store.state.app.sidebar.opened;
    return (
      <a-modal
        wrapClassName={this.getWrapperName()}
        visible={this.visiable}
        destroyOnClose={true}
        mask={!this.full}
        on-cancel={this.handleClose}
      >
        {this.$slots[this.slotName]}
      </a-modal>
    );
  }
}
