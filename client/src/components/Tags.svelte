<script lang="ts">
  import Card from './Card.svelte'
  import type { ITag } from '../api.interface'

  export let tagList: ITag[]
</script>

<Card className="tags" title="热门标签" isPaddingTop>
  <ul class="tag-list">
    {#each tagList as item}
      <li class="tag-item">
        <a href="/tag/{item.name}">#{item.alias}</a>
      </li>
    {/each}
  </ul>
</Card>

<style lang="less">
  .tag-list {
    padding-top: 12px;
  }
  .tag-item > a {
    color: #37475b;
    padding-right: 10px;
  }
</style>
