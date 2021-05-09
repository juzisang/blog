<script context="module" lang="ts">
  import { get } from '../../utils/fetch'
  import type { Preload } from '@sapper/common'

  export const preload: Preload = async function (this, page, session) {
    const articleResult = await get<IArticleResult>(`/article/${page.params.id}`)

    return {
      articleResult,
    }
  }
</script>

<script lang="ts">
  import type { IArticleResult } from '../../api.interface'

  export let articleResult: IArticleResult
</script>

<svelte:head>
  <title>{articleResult.title} | 橘子的Blog</title>
</svelte:head>

<article class="markdown-body card">
  {@html articleResult.contentHtml}
</article>

<style lang="less">
  .markdown-body {
    margin-bottom: 20px;
  }
</style>
