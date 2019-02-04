import { Vue, Component, Prop } from 'vue-property-decorator';
import { MuPaper, MuDivider } from '@/muse';
import * as style from '@/styles/components/ContentPanel.module.scss';
import { State } from 'vuex-class';
import * as Tsx from 'vue-tsx-support';

export interface ContentPanelProps {
  zDepth?: number;
  title?: string;
}

@Component({})
export default class ContentPanel extends Tsx.Component<ContentPanelProps> {
  @Prop({ type: Number, default: 2 })
  public readonly zDepth!: number;

  @Prop({ type: String, default: '' })
  public readonly title!: string;

  @State(state => state.theme)
  private readonly theme!: any;

  render() {
    return (
      <MuPaper class={style.panel} zDepth={this.zDepth}>
        <header class={style.header} style={{ backgroundColor: this.theme.background.default }}>
          {this.title}
        </header>
        <MuDivider />
        <section class={style.content} style={{ backgroundColor: this.theme.background.default }}>
          {this.$slots.default}
        </section>
      </MuPaper>
    );
  }
}
