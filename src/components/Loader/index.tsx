import { Component, Prop, Vue } from 'vue-property-decorator';
import '@/assets/styles/loader.scss';

@Component({})
export default class Loading extends Vue {
  @Prop()
  private spinning!: boolean;
  @Prop()
  private fullScreen!: boolean;
  render() {
    return (
      <div
        id="loader"
        class={{ hidden: !this.spinning, fullScreen: this.fullScreen }}
      >
        <div class="spinner">
          <div class="rect1" />
          <div class="rect2" />
          <div class="rect3" />
          <div class="rect4" />
          <div class="rect5" />
        </div>
      </div>
    );
  }
}
