import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import Header from '@/components/Layout/Header';

import '@/assets/styles/layout.scss';

@Component({
  components: {
  }
})
export default class AppMain extends Vue {
  render() {
    const {
      sidebar: { opened }
    } = this.$store.state.app;
    if (this.$route.meta.layout == 'no' || this.$route.path === '/') {
      return (
        <div class="app-one">
          <router-view />
        </div>
      );
    }
    return (
      <div class={`app-main ${opened ? '' : 'sideLayout'}`}>
        <Sidebar />
        <div class="page-content">
          <Header />
          <div class="page-wrap">
            <router-view />
          </div>
        </div>
      </div>
    );
  }
}
