import { Component, Vue } from 'vue-property-decorator';
import { MuForm, MuFormItem, MuTextField, MuRow, MuCol, MuCheckbox } from '@/muse';
import ContentPanel from '@/components/ContentPanel';
import { getTags } from '@/api/tag';
import { MavonEditor } from '@/components/MavonEditor';

@Component({})
export default class ArticleEdit extends Vue {
  form = {
    content: '',
  };

  tags: ISaveMeta[] = [];

  toolbars = {
    bold: true,
    italic: true,
    quote: true,
    code: true,
    imagelink: true,
    link: true,
    header: true,
    preview: true,
    fullscreen: true,
    save: true,
  };

  async created() {
    this.tags = await getTags();
  }

  render() {
    return (
      <div class="app-container">
        <MuRow>
          <MuCol span={9}>
            <ContentPanel title="编辑文章">
              <MuForm model={this.form} labelPosition={'right'} labelWidth={100}>
                <MuFormItem label="文章标签">
                  <MuTextField />
                </MuFormItem>
                <MuFormItem label="文章关键字">
                  <MuTextField />
                </MuFormItem>
                <MuFormItem label="文章描述">
                  <MuTextField multiLine rows={3} rowsMax={6} />
                </MuFormItem>
                <MuFormItem label="文章标签">
                  {this.tags.map(item => (
                    <MuCheckbox label={item.name} />
                  ))}
                </MuFormItem>
                <MuFormItem label="文章内容">
                  <MavonEditor style="width:100%;min-height:650px;" v-model={this.form.content} defaultOpen={'edit'} toolbars={this.toolbars} />
                </MuFormItem>
              </MuForm>
            </ContentPanel>
          </MuCol>
          <MuCol span={3} />
        </MuRow>
      </div>
    );
  }
}
