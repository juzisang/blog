<script context="module" lang="ts">
  import { get } from '../../utils/fetch'
  import type { Preload } from '@sapper/common'

  export const preload: Preload = async function (this, page, session) {
    const articleResult = get<IArticleResult>('/article/list')

    return {
      articleResult
    }
  }
</script>

<script lang="ts">
  import type { IArticleResult } from '../../api.interface'
  
  // export let articleResult:IArticleResult
</script>

<p>主页</p>

<svelte:head>
  <title>橘子的Blog</title>
</svelte:head>

<style lang="less">
</style>
