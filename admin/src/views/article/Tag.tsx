import { Component, Vue } from 'vue-property-decorator';
import ContentPanel from '@/components/ContentPanel';
import { MuRow, MuCol, MuForm, MuFormItem, MuTextField, MuButton, MuIcon, MuDataTable, MuToast } from '@/muse';
import { getTags, addTag, deleteTag, updateTag } from '@/api/tag';
import { EventBus } from '@/utils/bus';
import { ellipsis } from '@/filters';

// reload
const TAG_RELOAD = 'tag/reload';
// tag update
const TAG_UPDATE = 'tag/update';

@Component({})
export default class Tag extends Vue {
  beforeDestroy() {
    EventBus.$off(TAG_RELOAD);
    EventBus.$off(TAG_UPDATE);
  }

  render() {
    return (
      <div class="app-container ">
        <MuRow gutter>
          <MuCol xl={4} lg={4} md={12} sm={12} span={4}>
            <TagSave />
          </MuCol>
          <MuCol xl={8} lg={8} md={12} sm={12} span={8}>
            <TagList />
          </MuCol>
        </MuRow>
      </div>
    );
  }
}

@Component({})
class TagSave extends Vue {
  public readonly $refs!: {
    form: any;
  };

  private saveForm = {
    mid: 0,
    name: '',
    slug: '',
    description: '',
  };

  private formRules = {
    nameRules: [{ validate: (val: string) => val, message: '必须填写标签名称' }],
    slugRules: [{ validate: (val: string) => val, message: '必须填写标签别名' }],
    descriptionRules: [{ validate: (val: string) => val, message: '必须填写标签描述' }],
  };

  created() {
    // 修改标签
    EventBus.$on(TAG_UPDATE, (data: any) => {
      const { mid, name, slug, description } = data;
      Object.assign(this.saveForm, { mid, name, slug, description });
    });
  }

  async handleSubmit() {
    const result = await this.$refs.form.validate();
    if (result) {
      await addTag(this.saveForm);
      this.clearForm();
      EventBus.$emit(TAG_RELOAD);
      MuToast.success('添加成功');
    }
  }

  async handleUpdate() {
    const result = await this.$refs.form.validate();
    if (result) {
      await updateTag(this.saveForm.mid, this.saveForm);
      this.clearForm();
      EventBus.$emit(TAG_RELOAD);
      MuToast.success('修改成功');
    }
  }

  clearForm() {
    this.$refs.form.clear();
    this.saveForm = {
      mid: 0,
      name: '',
      slug: '',
      description: '',
    };
  }

  render() {
    return (
      <ContentPanel title={'新建标签'}>
        <MuForm model={this.saveForm} ref="form">
          <MuFormItem prop="name" label="标签名称" rules={this.formRules.nameRules}>
            <MuTextField v-model={this.saveForm.name} />
          </MuFormItem>
          <MuFormItem prop="slug" label="别名" rules={this.formRules.slugRules}>
            <MuTextField v-model={this.saveForm.slug} />
          </MuFormItem>
          <MuFormItem prop="description" label="描述" rules={this.formRules.descriptionRules}>
            <MuTextField v-model={this.saveForm.description} multiLine rows={3} rowsMax={6} />
          </MuFormItem>
          <MuFormItem>
            {this.saveForm.mid ? (
              <MuButton onClick={this.handleUpdate} color="primary">
                <MuIcon left value="playlist_add_check" /> 修改标签
              </MuButton>
            ) : (
              <MuButton onClick={this.handleSubmit} color="primary">
                <MuIcon left value="playlist_add_check" /> 新增标签
              </MuButton>
            )}
            <MuButton onClick={this.clearForm}>
              <MuIcon left value="refresh" />
              重置
            </MuButton>
          </MuFormItem>
        </MuForm>
      </ContentPanel>
    );
  }
}

@Component({})
class TagList extends Vue {
  columns = [
    {
      title: 'ID',
      name: 'mid',
      align: 'center',
      cellAlign: 'center',
      width: 120,
    },
    {
      title: '名称',
      name: 'name',
      align: 'center',
      cellAlign: 'center',
    },
    {
      title: '别名',
      name: 'slug',
      align: 'center',
      cellAlign: 'center',
    },
    {
      title: '描述',
      name: 'description',
      align: 'center',
      cellAlign: 'center',
    },
    {
      title: '文章数',
      name: 'articleNum',
      align: 'center',
      cellAlign: 'center',
    },
    {
      title: '操作',
      width: 225,
      align: 'center',
      cellAlign: 'center',
    },
  ];

  // tags
  data = [];

  // loading
  loading = true;

  created() {
    // 监听改变，重新加载
    EventBus.$on(TAG_RELOAD, () => this.loadData());
    // load
    this.loadData();
  }

  getColumns(title: string, width: any, name: string) {
    return { title, width, name };
  }

  async loadData() {
    this.loading = true;
    this.data = await getTags();
    setTimeout(() => (this.loading = false), 500);
  }

  async handleDelete(mid: number) {
    await deleteTag(mid);
    await this.loadData();
    MuToast.success('删除成功');
  }

  handleUpdate(tag: any) {
    EventBus.$emit(TAG_UPDATE, tag);
  }

  render() {
    return (
      <ContentPanel title={'标签列表'} loading={this.loading} showLoading={true} onRefresh={this.loadData}>
        <MuDataTable
          stripe
          columns={this.columns}
          data={this.data}
          scopedSlots={{
            default: ({ row }) => {
              return [
                <td class="is-center">{row.mid}</td>,
                <td class="is-center">{row.name}</td>,
                <td class="is-center">{row.slug}</td>,
                <td class="is-center">{ellipsis(row.description, 6)}</td>,
                <td class="is-center">{row.articleNum}</td>,
                <td class="is-center">
                  <MuButton type="text" color="primary" onClick={() => this.handleUpdate(row)} small flat>
                    编辑标签
                  </MuButton>
                  <MuButton type="text" color="error" onClick={() => this.handleDelete(row.mid)} small flat>
                    删除标签
                  </MuButton>
                </td>,
              ];
            },
          }}
        />
      </ContentPanel>
    );
  }
}
