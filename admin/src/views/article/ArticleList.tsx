import { Component, Vue } from 'vue-property-decorator';
import ContentPanel from '@/components/ContentPanel';
import { MuDataTable, MuButton, MuToast, MuPagination, MuFlex } from '@/muse';
import { getArticles, deleteArticle, publishArticle } from '@/api/article';

@Component({})
export default class ArticleList extends Vue {
  columns = [
    {
      title: 'ID',
      name: 'aid',
      align: 'center',
      cellAlign: 'center',
      width: 120,
    },
    {
      title: '标题',
      name: 'title',
      align: 'center',
      cellAlign: 'center',
    },
    {
      title: '关键字',
      name: 'keywords',
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
      title: '状态',
      name: 'state',
      align: 'center',
      cellAlign: 'center',
    },
    {
      title: '操作',
      align: 'center',
      cellAlign: 'center',
      width: 50 * 3,
    },
  ];

  articleList = [];

  pagination = {
    count: 0,
    index: 1,
    size: 10,
  };

  loading = false;

  created() {
    this.loadArticle();
  }

  async loadArticle() {
    this.loading = true;
    const { list, pagination } = await getArticles({ size: 10, index: 1, state: 'all' });
    this.articleList = list;
    this.pagination = pagination;
    this.loading = false;
  }

  async handlePublish(aid: any) {
    await publishArticle(aid);
    await this.loadArticle();
    MuToast.success('发布成功');
  }

  async handleDelete(aid: any) {
    await deleteArticle(aid);
    await this.loadArticle();
    MuToast.success('删除成功');
  }

  handleEdit(aid: any) {
    this.$router.push({ name: 'ArticleEdit', query: { aid } });
  }

  mapState(state: string) {
    switch (state) {
      case 'draft':
        return '草稿';
      case 'delete':
        return '已删除';
      default:
        return '已发布';
    }
  }

  render() {
    return (
      <div>
        <ContentPanel title="文章列表" loading={this.loading} showLoading={true} onRefresh={this.loadArticle}>
          <MuDataTable
            stripe
            columns={this.columns}
            data={this.articleList}
            scopedSlots={{
              default: ({ row }) => [
                <td class="is-center">{row.aid}</td>,
                <td class="is-center">{row.title}</td>,
                <td class="is-center">{row.keywords}</td>,
                <td class="is-center">{row.description}</td>,
                <td class="is-center">{this.mapState(row.state)}</td>,
                <td>
                  <MuFlex justifyContent={'center'}>
                    <MuButton color="success" style="min-width:46px;" onClick={() => this.handleEdit(row.aid)} small flat>
                      编辑
                    </MuButton>
                    <MuButton color="primary" style="min-width:46px;" onClick={() => this.handlePublish(row.aid)} small flat>
                      发布
                    </MuButton>
                    <MuButton color="error" style="min-width:46px;" onClick={() => this.handleDelete(row.aid)} small flat>
                      删除
                    </MuButton>
                  </MuFlex>
                </td>,
              ],
            }}
          />
          <MuFlex justifyContent={'end'} style="padding:16px 0;">
            <MuPagination total={this.pagination.count} current$sync={this.pagination.index} pageSize={this.pagination.size} />
          </MuFlex>
        </ContentPanel>
      </div>
    );
  }
}
