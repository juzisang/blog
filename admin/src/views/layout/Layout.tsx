import { Vue, Component } from 'vue-property-decorator';
import Sidebar from './components/Sidebar';
import MainNav from './components/MainNav';
import Dashboard from './components/Dashboard';
import * as style from '@/styles/views/Layout.module.scss';
import { Action } from 'vuex-class';
import { debounce } from 'typescript-debounce-decorator';
import { homeRouter } from '@/router';

@Component({})
export default class Layout extends Vue {
  @Action('AppInit')
  private readonly getInit!: () => Promise<any>;

  private sideOpen: boolean = true;

  private get noCacheViews() {
    return homeRouter.filter(item => item.meta.cache === false).map(item => item.name as string);
  }

  async created() {
    await this.getInit();
  }

  mounted() {
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
  }

  beforeDestroy() {
    window.removeEventListener('resize', () => this.handleResize());
  }

  @debounce(250)
  handleResize() {
    if (window.innerWidth < 768) {
      this.sideOpen = false;
    } else {
      this.sideOpen = true;
    }
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
          <keep-alive max={10} exclude={this.noCacheViews}>
            <router-view />
          </keep-alive>
        </div>
      </div>
    );
  }
}
