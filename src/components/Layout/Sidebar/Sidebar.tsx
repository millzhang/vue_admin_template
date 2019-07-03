import { Component, Vue } from 'vue-property-decorator';
import MenuList from './MenuList';

@Component
export default class SiderBar extends Vue {
  render() {
    const {
      menuData,
      sidebar: { opened }
    } = this.$store.state.app;
    return (
      <div class="side-bar">
        <div class="logo-wrap">
          {/* <img src={require('@/assets/images/logo.png')} alt="logo" /> */}
          {/* <h1 class="txt">vue-admin</h1> */}
        </div>
        <MenuList />
      </div>
    );
  }
}
