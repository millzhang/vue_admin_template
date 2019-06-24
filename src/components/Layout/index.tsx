import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Common'
})
export default class Verify extends Vue {
  render() {
    return <router-view />;
  }
}
