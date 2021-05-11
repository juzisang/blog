<script lang="ts">
  import Card from './Card.svelte'
  import type { IRecent } from '../api.interface'

  export let recentList: IRecent[]
</script>

<Card className="recent" title="最近文章">
  <ul class="recent-list">
    {#each recentList as item}
      <li class="recent-item">
        <div class="time">{item.ctime}</div>
        <a href="/article/{item.id}">{item.title}</a>
      </li>
    {/each}
  </ul>
</Card>

<style lang="less">
  .recent-list {
    padding-top: 8px;
  }
  .recent-item {
    padding: 12px 0;
    border-bottom: 1px solid #e6e8ee;
    &:last-child {
      border-bottom: 1px solid transparent;
      padding-bottom: 0;
    }
    .time {
      font-size: 12px;
      padding-bottom: 4px;
    }
    a {
      line-height: 1.5;
      font-size: 14px;
      color: #475b6d;
    }
  }
</style>
