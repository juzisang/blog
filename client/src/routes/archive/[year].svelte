<script context="module" lang="ts">
  import { fetchGet } from '../../utils/fetch'
  import type { Preload } from '@sapper/common'

  export const preload: Preload = async function (this, page, session) {
    const articleList = await fetchGet<IArticleItem[]>(`/article/archive/year/${page.params.year}`)
    return { title: page.params.year, articleList }
  }
</script>

<script lang="ts">
  import type { IArticleItem } from '../../api.interface'

  export let title: string
  export let articleList: IArticleItem[]

</script>

{#each articleList as item}
  <p>{item.title}</p>
{/each}

<svelte:head>
  <title>{title} | 橘子的Blog</title>
</svelte:head>

<style lang="less">
</style>
