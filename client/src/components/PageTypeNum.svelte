<script lang="ts">
  export let type: 'tag' | 'category' | 'archive' = 'tag'
  export let name: string
  export let size: number
</script>

<header class="page-header-type">
  {#if type === 'tag'}
    <span>标签：{name}</span>
  {:else if type === 'archive'}
    <span>归档：{name}</span>
  {:else}
    <span>分类：{name}</span>
  {/if}
  <span>共 {size} 篇文章</span>
</header>

<style lang="less">
</style>
