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

  renderChildren(item: RouteConfig) {
    if (!item.children) {
      return (
        <MuListItem to={item.path} button>
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
        <MuListAction>
          <MuIcon class="toggle-icon" size="24" value="keyboard_arrow_down" />
        </MuListAction>
        {item.children.map(childrenItem => (
          <MuListItem to={'/' + item.path + '/' + childrenItem.path} button slot="nested">
            <MuListAction>
              <MuIcon size={22} value={childrenItem.meta.icon} />
            </MuListAction>
            <MuListItemTitle>{childrenItem.meta.title}</MuListItemTitle>
          </MuListItem>
        ))}
      </MuListItem>
    );
  }

  render() {
    return (
      <MuDrawer open$sync={this._open} zDepth={1} width={260} docked>
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
