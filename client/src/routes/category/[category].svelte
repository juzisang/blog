<script context="module" lang="ts">
  import type { Preload } from '@sapper/common'
  import type { ICategory } from '../../api.interface'
  import { fetchGet } from '../../utils/fetch'
  import { getTitle } from '../../utils/utils'

  export const preload: Preload = async function (this, page, session) {
    const category = await fetchGet<ICategory>(`/category/${page.params.category}`)
    return { category }
  }
</script>

<script lang="ts">
  export let category: ICategory
</script>

<div class="card"><span class="page-title">分类：{category.alias}</span> <span>共 {category.articleCount} 篇文章</span></div>

<svelte:head>
  <title>{getTitle(category.alias)}</title>
</svelte:head>

<style lang="less">
  @import '../../styles/vars.less';
  .page-title {
    color: @title;
    font-size: 22px;
    margin-left: 8px;
    margin-right: 8px;
  }
</style>
