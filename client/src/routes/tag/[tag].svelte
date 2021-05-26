<script context="module" lang="ts">
  import type { Preload } from '@sapper/common'
import { getTitle } from '../../utils/utils';

  export const preload: Preload = async function (this, page, session) {
    return { title: page.params.tag }
  }
</script>

<script lang="ts">
  export let title: string
</script>

<p>{title}</p>

<svelte:head>
  <title>{getTitle(title)}</title>
</svelte:head>

<style lang="less">
</style>
