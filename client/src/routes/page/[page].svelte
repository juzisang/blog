<script context="module" lang="ts">
  import { fetchGet } from '../../utils/fetch'
  import type { Preload } from '@sapper/common'

  export const preload: Preload = async function (this, page, session) {
    const articleResult = fetchGet<IArticleListResult>('/article/list')

    return {
      articleResult
    }
  }
</script>

<script lang="ts">
  import type { IArticleListResult } from '../../api.interface'
  
  // export let articleResult:IArticleResult
</script>

<p>主页</p>

<svelte:head>
  <title>橘子的Blog</title>
</svelte:head>

<style lang="less">
</style>
