<script lang="ts">
  import Card from './Card.svelte'
  import type { IArchive } from '../api.interface'

  export let archiveList: IArchive[]
</script>

<Card className="archive" title="归档" isPaddingTop>
  <ul class="archive-list">
    {#each archiveList as item}
      <li class="archive-item">
        <a href="/archive/{item.name}">
          {item.name}
          <span class="article-count">{item.articleCount}</span>
        </a>
      </li>
    {/each}
  </ul>
</Card>

<style lang="less">
  .archive-list {
    padding-top: 8px;
  }
  .archive-item > a {
    padding: 0 8px;
    line-height: 32px;
    display: flex;
    justify-content: space-between;
    color: #37475b;
    align-items: center;
    &:hover,
    &:active {
      border-radius: 4px;
      background-color: #f2f5f8;
    }
  }
</style>
