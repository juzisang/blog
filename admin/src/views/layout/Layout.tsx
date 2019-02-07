import { Vue, Component } from 'vue-property-decorator';
import Sidebar from './components/Sidebar';
import MainNav from './components/MainNav';
import Dashboard from './components/Dashboard';
import * as style from '@/styles/views/Layout.module.scss';
import { Action } from 'vuex-class';
import { debounce } from '@/filters';

@Component({})
export default class Layout extends Vue {
  @Action('AppInit')
  private readonly getInit!: () => Promise<any>;

  private sideOpen: boolean = true;

  private timerCode: any = null;

  private resizeDebounce = debounce(() => {
    this.handleResize();
  }, 250);

  async created() {
    await this.getInit();
  }

  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.resizeDebounce);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeDebounce);
  }

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
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    );
  }
}
