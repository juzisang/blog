<script lang="ts">
  import type { ITag } from '../api.interface'

  export let tagList: ITag[]
</script>

<div class="tags card card-mt">
  <h4>热门标签</h4>
  <ul class="tag-list">
    {#each tagList as item}
      <li class="tag-item">
        <a href="/tags/{item.name}">#{item.name}</a>
      </li>
    {/each}
  </ul>
</div>

<style lang="less">
  .tag-list {
    padding-top: 12px;
  }
  .tag-item > a {
    color: #37475b;
    padding-right: 10px;
  }
</style>
