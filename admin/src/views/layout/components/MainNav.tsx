import * as Tsx from 'vue-tsx-support';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { MuAppBar, MuButton, MuIcon } from '@/muse';
import * as style from '@/styles/views/layout.module.scss';

export interface MainNavProps {
  open?: boolean;
}

@Component({})
export default class MainNav extends Tsx.Component<MainNavProps> {
  @Prop({ type: Boolean })
  public readonly open!: boolean;

  private get appBarStyle(): object {
    return {
      left: this.open ? '260px' : 0,
    };
  }

  render() {
    return (
      <MuAppBar class={style.appBar} style={this.appBarStyle} zDepth={2}>
        <MuButton icon slot="left" onClick={() => this.$emit('update:open', !this.open)}>
          <MuIcon value="menu" />
        </MuButton>
      </MuAppBar>
    );
  }
}
