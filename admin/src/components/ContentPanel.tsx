import { Component, Prop } from 'vue-property-decorator';
import { MuPaper, MuDivider, MuLinearProgress, MuButton, MuIcon } from '@/muse';
import * as style from '@/styles/components/ContentPanel.module.scss';
import { State } from 'vuex-class';
import * as Tsx from 'vue-tsx-support';
import { debounce } from '@/filters';

export interface ContentPanelProps {
  zDepth?: number;
  title?: string;
  showLoading?: boolean;
  loading?: boolean;
}

export interface ContentPanelEvents {
  onRefresh: any;
}

@Component({})
export default class ContentPanel extends Tsx.Component<ContentPanelProps, ContentPanelEvents> {
  @Prop({ type: Number, default: 2 })
  public readonly zDepth!: number;

  @Prop({ type: String, default: '' })
  public readonly title!: string;

  @Prop({ type: Boolean, default: false })
  public readonly loading!: string;

  @Prop({ type: Boolean, default: false })
  public readonly showLoading!: boolean;

  @State(state => state.theme)
  private readonly theme!: any;

  handleRefresh() {
    return debounce(() => this.$emit('refresh'), 200);
  }

  render() {
    return (
      <MuPaper class={style.panel} zDepth={this.zDepth}>
        <header class={style.header} style={{ backgroundColor: this.theme.background.default }}>
          {this.title}
          {this.showLoading && (
            <div class={style.action}>
              <MuButton onClick={this.handleRefresh()} icon>
                <MuIcon value="refresh" />
              </MuButton>
            </div>
          )}
        </header>
        <MuDivider />
        {this.loading && <MuLinearProgress class={style.progress} />}
        <section class={style.content} style={{ backgroundColor: this.theme.background.default }}>
          {this.$slots.default}
        </section>
      </MuPaper>
    );
  }
}
