import { Component, Vue } from 'vue-property-decorator';
import ContentPanel from '@/components/ContentPanel';
import { MuRow, MuCol, MuForm, MuFormItem, MuTextField, MuButton, MuDivider, MuIcon } from '@/muse';

@Component({})
export default class Tag extends Vue {
  public readonly $refs!: {
    form: any;
  };

  private addForm = {};

  render() {
    return (
      <div class="app-container ">
        <MuRow gutter>
          <MuCol span={4}>
            <ContentPanel title={'新建标签'}>
              <MuForm model={this.addForm} ref="form">
                <MuFormItem label="标签名称">
                  <MuTextField />
                </MuFormItem>
                <MuFormItem label="别名">
                  <MuTextField />
                </MuFormItem>
                <MuFormItem label="描述">
                  <MuTextField multiLine rows={3} rowsMax={6} />
                </MuFormItem>
                <MuFormItem>
                  <MuButton color="primary">
                    <MuIcon left value="playlist_add_check" /> 新增标签
                  </MuButton>
                  <MuButton onClick={() => this.$refs.form.clear()}>
                    <MuIcon left value="refresh" />
                    重置
                  </MuButton>
                </MuFormItem>
              </MuForm>
            </ContentPanel>
          </MuCol>
          <MuCol span={8}>
            <ContentPanel title={'标签列表'}>1</ContentPanel>
          </MuCol>
        </MuRow>
      </div>
    );
  }
}
