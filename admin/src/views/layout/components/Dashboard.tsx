import { Vue, Component } from 'vue-property-decorator';
import * as style from '@/styles/views/Layout.module.scss';
import { MuBreadcrumbs, MuBreadcrumbsItem } from '@/muse';
import { homeRouter } from '@/router';
import { RouteConfig } from 'vue-router';
import { State } from 'vuex-class';

@Component({
  components: {
    'mu-breadcrumbs-item': MuBreadcrumbsItem,
  },
})
export default class Dashboard extends Vue {
  @State(state => state.theme.text)
  private readonly textColor!: any;

  get dashboard(): RouteConfig[] {
    const home = homeRouter.find(item => item.name === 'Home') as any;
    const current = this.$route.matched[this.$route.matched.length - 1];
    const router = [home];
    if (current.name !== home.name) {
      router.push(current);
    }
    return router as any;
  }

  get colors(): string[] {
    return this.dashboard.length === 1 ? [this.textColor.primary] : [this.textColor.primary, this.textColor.disabled];
  }

  render() {
    return (
      <div class={style.dashboard}>
        <MuBreadcrumbs>
          {this.dashboard.map((item, index) => (
            <mu-breadcrumbs-item class={[style.breadcrumbsItem]} style={{ color: this.colors[index] }} to={{ name: item.name }} key={item.path} disabled={this.dashboard.length - 1 === index}>
              {item.meta.title}
            </mu-breadcrumbs-item>
          ))}
        </MuBreadcrumbs>
      </div>
    );
  }
}
