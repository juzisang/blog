<script lang="ts">
  import type { ICategory } from '../api.interface'

  export let categoryList: ICategory[]
</script>

<div class="categorys card card-mt">
  <h4>分类</h4>
  <ul class="category-list">
    {#each categoryList as item}
      <li class="category-item">
        <a href="/categorys/{item.name}">
          {item.name}
          <span class="article-count">{item.articleCount}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style lang="less">
  .category-list {
    padding-top: 8px;
  }
  .category-item > a {
    padding: 0 8px;
    line-height: 32px;
    display: flex;
    justify-content: space-between;
    color: #37475b;
    &:hover,
    &:active {
      border-radius: 4px;
      background-color: #f2f5f8;
    }
  }
</style>
