import { Vue, Component } from 'vue-property-decorator';
import Sidebar from './components/Sidebar';
import MainNav from './components/MainNav';
import Dashboard from './components/Dashboard';
import * as style from '@/styles/views/Layout.module.scss';
import { Action } from 'vuex-class';

@Component({})
export default class Layout extends Vue {
  @Action('AppInit')
  private readonly getInit!: () => Promise<any>;

  private sideOpen: boolean = true;

  async created() {
    await this.getInit();
  }

  get layoutStyle() {
    return {
      paddingLeft: (this.sideOpen ? 260 + 16 : 16) + 'px',
    };
  }

  render() {
    return (
      <div class={style.layout}>
        <Sidebar open$sync={this.sideOpen} />
        <MainNav open$sync={this.sideOpen} />
        <div class={style.appContent} style={this.layoutStyle}>
          <Dashboard />
          <router-view />
        </div>
      </div>
    );
  }
}
