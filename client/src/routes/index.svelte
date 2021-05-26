<script context="module" lang="ts">
  import { fetchGet } from '../utils/fetch'
  import type { Preload } from '@sapper/common'

  export const preload: Preload = async function (this, page, session) {
    const articleResult = await fetchGet<IArticleListResult>('/article')

    return {
      articleResult,
    }
  }
</script>

<script lang="ts">
  import type { IArticleListResult } from '../api.interface'
  import ArticleItem from '../components/ArticleItem.svelte'
  import { getTitle } from '../utils/utils'

  export let articleResult: IArticleListResult
</script>

{#each articleResult.list as articleItem, index}
  <ArticleItem {articleItem} isPaddingTop={index > 0} />
{/each}

<svelte:head>
  <title>{getTitle()}</title>
</svelte:head>

<style lang="less">
</style>
