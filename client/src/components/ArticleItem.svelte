<script lang="ts">
  import type { IArticleItem } from '../api.interface'
  import Card from './Card.svelte'

  export let articleItem: IArticleItem
  export let isPaddingTop: boolean
</script>

<Card className="article-item" {isPaddingTop}>
  {#if !!articleItem.thumb}
    <a class="article-thumb" href="/article/{articleItem.id}">
      <img src={articleItem.thumb} alt="{articleItem.title}-缩略图" />
    </a>
  {/if}
  <article class="article">
    <h1 class="article-title"><a href="/article/{articleItem.id}">{articleItem.title}</a></h1>
    <p class="article-description">{articleItem.description}</p>
    <div class="article-info">
      <div class="info-left">
        <time class="date" datetime="articleItem.ctime">{articleItem.ctime}</time>
        <span class="dot" />
        <span class="views">阅读数：{articleItem.views}</span>
      </div>
      <a class="article-link" href="/article/{articleItem.id}">继续阅读</a>
    </div>
  </article>
</Card>

<style lang="less">
  @import '../styles/vars.less';

  :global(.article-item) {
    position: relative;
    padding: 0 !important;
    overflow: hidden;
  }
  .article-thumb {
    display: block;
    height: 233px;
    img {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .article {
    padding: 18px;
  }
  .article-title {
    font-weight: 400;
    font-size: 22px;
    line-height: 1.125;
    a {
      color: @title;
    }
  }
  .article-description {
    padding: 14px 0;
    font-size: 14px;
  }
  .article-info {
    display: flex;
    color: @subtitle;
    justify-content: space-between;
  }

</style>
