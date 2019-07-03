import { Component, Vue } from 'vue-property-decorator';
import AppMain from '@/components/Layout/AppMain';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'ant-design-vue';
import Loader from '@/components/Loader';

@Component({
  components: {
    loader: Loader,
    'a-locale-provider': LocaleProvider
  }
})
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <loader spinning={this.$store.getters.spinning} fullScreen />
        <a-locale-provider locale={zh_CN}>
          <AppMain />
        </a-locale-provider>
      </div>
    );
  }
}
