<script lang="ts">
  import Card from './Card.svelte'
  import type { ICategory } from '../api.interface'

  export let categoryList: ICategory[]
</script>

<Card className="categorys" title="分类" isPaddingTop>
  <ul class="category-list">
    {#each categoryList as item}
      <li class="category-item">
        <a href="/category/{item.name}">
          {item.alias}
          <span class="article-count">{item.articleCount}</span>
        </a>
      </li>
    {/each}
  </ul>
</Card>

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
    align-items: center;
    &:hover,
    &:active {
      border-radius: 4px;
      background-color: #f2f5f8;
    }
  }
</style>
