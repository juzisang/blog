import * as Tsx from 'vue-tsx-support';
import { Component, Prop } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { MuDrawer, MuAppBar, MuAvatar, MuList, MuListItem, MuListAction, MuIcon, MuListItemTitle, MuDivider } from '@/muse';
import { homeRouter } from '@/router';
import * as style from '@/styles/views/Layout.module.scss';
export interface SideBarProps {
  open?: boolean;
}

@Component({})
export default class SideBar extends Tsx.Component<SideBarProps> {
  @Prop({ type: Boolean })
  public readonly open!: boolean;

  private get _open(): boolean {
    return this.open;
  }

  private set _open(value) {
    this.$emit('update:open', value);
  }

  get routes(): RouteConfig[] {
    return homeRouter;
  }

  routerPath(path: string, parentRouters: RouteConfig[], childRouter: RouteConfig): string {
    for (let router of parentRouters) {
      if (router === childRouter) {
        return `${path}/${router.path}`;
      } else if (router.children && router.children.length > 0) {
        const str = this.routerPath(`${path}/${router.path}`, router.children, childRouter);
        if (str) return str;
      }
    }
    return '';
  }

  renderChildren(item: RouteConfig) {
    if (!item.children) {
      const path = this.routerPath('', this.routes, item);
      return (
        <MuListItem exact exactActiveClass="hover" to={path} button>
          <MuListAction>
            <MuIcon size={22} value={item.meta.icon} />
          </MuListAction>
          <MuListItemTitle>{item.meta.title}</MuListItemTitle>
        </MuListItem>
      );
    }

    return (
      <MuListItem nested button>
        <MuListAction>
          <MuIcon size={22} value={item.meta.icon} />
        </MuListAction>
        <MuListItemTitle>{item.meta.title}</MuListItemTitle>
        {/* 子路由，显示icon */}
        <MuListAction>
          <MuIcon class="toggle-icon" size="24" value="keyboard_arrow_down" />
        </MuListAction>
        {/* 子路由 */}
        {item.children.map(childrenItem => {
          const path = this.routerPath('', this.routes, childrenItem);
          return (
            <MuListItem exact exactActiveClass="hover" to={path} button slot="nested">
              <MuListAction>
                <MuIcon size={22} value={childrenItem.meta.icon} />
              </MuListAction>
              <MuListItemTitle>{childrenItem.meta.title}</MuListItemTitle>
            </MuListItem>
          );
        })}
      </MuListItem>
    );
  }

  render() {
    return (
      <MuDrawer class={style.sidebar} open$sync={this._open} zDepth={1} width={260} docked>
        <MuAppBar zDepth={2} title="Blog Admin">
          <MuAvatar class="margin-left-16" slot="left" size={32}>
            <img src="https://avatars2.githubusercontent.com/u/14973323?s=460&v=4" />
          </MuAvatar>
          <span>Blog Admin</span>
        </MuAppBar>
        <MuList toggleNested>{this.routes.map(item => this.renderChildren(item))}</MuList>
      </MuDrawer>
    );
  }
}
