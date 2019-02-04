import { Vue, Component, Prop } from 'vue-property-decorator';
import { MuPaper } from '@/muse';
import * as style from '@/styles/components/CardPanel.module.scss';

export interface CardPanelProps {
  zDepth?: number;
}

@Component({})
export default class CardPanel extends Vue {
  @Prop({ type: Number, default: 2 })
  public readonly zDepth!: number;

  @Prop({ type: String, default: '' })
  public readonly title!: string;

  render() {
    return (
      <MuPaper zDepth={this.zDepth}>
        <div class={style.title}>{this.title}</div>
      </MuPaper>
    );
  }
}
