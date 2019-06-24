import { Component, Vue } from 'vue-property-decorator';
import AppMain from '@/components/Layout/AppMain';

@Component({})
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <AppMain />
      </div>
    );
  }
}
