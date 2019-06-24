import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Dashboard extends Vue {
  render() {
    return (
      <div class="dash-container">
        <h1>Dashboard</h1>
      </div>
    );
  }
}
