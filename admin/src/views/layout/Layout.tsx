import { Vue, Component } from 'vue-property-decorator';
import Sidebar from './components/Sidebar';
import MainNav from './components/MainNav';
import Dashboard from './components/Dashboard';

@Component({})
export default class Layout extends Vue {
  private sideOpen: boolean = true;

  render() {
    return (
      <div class="app-controller">
        <Sidebar open$sync={this.sideOpen} />
        <MainNav open$sync={this.sideOpen} />
        <div class="app-content">
          <Dashboard />
          <div class="app-warp">
            <router-view />
          </div>
        </div>
      </div>
    );
  }
}
