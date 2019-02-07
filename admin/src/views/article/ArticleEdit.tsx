import { Component, Vue } from 'vue-property-decorator';
import { MuForm, MuFormItem, MuTextField, MuRow, MuCol, MuCheckbox, MuFlex, MuRadio, MuButton, MuIcon, MuSelect, MuOption } from '@/muse';
import ContentPanel from '@/components/ContentPanel';
import { ImgInputer } from '@/components/ImgInputer';
import { getTags } from '@/api/tag';
import { MavonEditor } from '@/components/MavonEditor';
import * as style from '@/styles/views/ArticleEdit.module.scss';
import { getCategorys } from '@/api/category';

@Component({})
export default class ArticleEdit extends Vue {
  form = {
    title: '',
    keywords: '',
    description: '',
    content: '',
    thumb: '',
    state: 'draft',
    category: '',
    tags: [],
  };

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

  tagList: any[] = [];
  categoryList: any[] = [];

  async created() {
    this.loadTags();
    this.loadCategorys();
  }

  async loadTags() {
    this.tagList = await getTags();
  }

  async loadCategorys() {
    this.categoryList = await getCategorys();
  }

  // 文章保存
  handleSave() {
    console.log('save');
  }

  render() {
    return (
      <div class="app-container">
        <MuRow gutter>
          <MuCol span={9}>
            <ContentPanel title="编辑文章">
              <MuForm model={this.form} labelPosition={'right'} labelWidth={100}>
                <MuFormItem label="文章标题">
                  <MuTextField v-model={this.form.title} />
                </MuFormItem>
                <MuFormItem label="文章关键字">
                  <MuTextField v-model={this.form.keywords} />
                </MuFormItem>
                <MuFormItem label="文章描述">
                  <MuTextField multiLine rows={3} rowsMax={6} v-model={this.form.description} />
                </MuFormItem>
                <MuFormItem label="文章内容">
                  <MavonEditor class="mu-input" style="width:100%;min-height:450px;" placeholder="编辑文章..." v-model={this.form.content} defaultOpen={'edit'} toolbars={this.toolbars} onSave={this.handleSave} />
                </MuFormItem>
              </MuForm>
            </ContentPanel>
          </MuCol>
          <MuCol span={3}>
            <ContentPanel title="缩略图">
              <div class="form">
                <ImgInputer class={style.thumb} icon="img" placeholder="上传缩略图" />
              </div>
            </ContentPanel>

            <ContentPanel class={style.panel} title="分类目录" showLoading={true} onRefresh={this.loadCategorys}>
              <MuFlex class={['form']} direction={'column'}>
                {this.categoryList.map(item => (
                  <MuRadio key={item.mid} inputValue={this.form.category} value={item.mid} onChange={(value: any) => (this.form.category = value)} class={style.formCheckbox} label={item.name} />
                ))}
              </MuFlex>
            </ContentPanel>

            <ContentPanel class={style.panel} showLoading={true} onRefresh={this.loadTags} title="标签列表">
              <MuFlex class={['form']} direction={'column'}>
                {this.tagList.map(item => (
                  <MuCheckbox key={item.mid} inputValue={this.form.tags} value={item.mid} onChange={(value: any) => (this.form.tags = value)} class={style.formCheckbox} label={item.name} />
                ))}
              </MuFlex>
            </ContentPanel>

            <ContentPanel class={style.panel} title="发布选项">
              <MuForm model={this.form} labelPosition="left" labelWidth={48}>
                <MuFormItem label="状态">
                  <MuSelect v-model={this.form.state}>
                    <MuOption value="online" label="直接发布" />
                    <MuOption value="draft" label="暂存草稿" />
                    <MuOption value="delete" label="直接删除" />
                  </MuSelect>
                </MuFormItem>
                <MuFormItem>
                  <MuButton style="margin:0;" fullWidth color="primary">
                    发布
                  </MuButton>
                </MuFormItem>
              </MuForm>
            </ContentPanel>
          </MuCol>
        </MuRow>
      </div>
    );
  }
}
