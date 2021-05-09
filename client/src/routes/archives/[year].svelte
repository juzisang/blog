<script context="module" lang="ts">
  import type { Preload } from '@sapper/common'

  export const preload: Preload = async function (this, page, session) {
    return { title: page.params.year }
  }
</script>

<script lang="ts">
  export let title: string
</script>

<p>{title}</p>

<svelte:head>
  <title>{title} | 橘子的Blog</title>
</svelte:head>

<style lang="less">
</style>
