import * as Tsx from 'vue-tsx-support';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { MuDrawer, MuAppBar, MuAvatar } from '@/muse';
import * as style from '@/styles/views/layout.module.scss';

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

  render() {
    return (
      <MuDrawer open$sync={this._open} zDepth={1} width={260} docked>
        <MuAppBar zDepth={2} title="Blog Admin">
          <MuAvatar class="margin-left-16" slot="left" size={32}>
            <img src="https://avatars2.githubusercontent.com/u/14973323?s=460&v=4" />
          </MuAvatar>
          <span>Blog Admin</span>
        </MuAppBar>
      </MuDrawer>
    );
  }
}
