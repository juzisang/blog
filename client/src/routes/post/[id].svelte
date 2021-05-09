<script context="module" lang="ts">
  import { fetchGet } from '../../utils/fetch'
  import type { Preload } from '@sapper/common'

  export const preload: Preload = async function (this, page, session) {
    const articleResult = await fetchGet<IArticleResult>(`/article/${page.params.id}`)

    return {
      articleResult,
    }
  }
</script>

<script lang="ts">
  import type { IArticleResult } from '../../api.interface'

  export let articleResult: IArticleResult
</script>

<svelte:head>
  <title>{articleResult.title} | 橘子的Blog</title>
  <meta content={articleResult.description} name="description" />
</svelte:head>

<article class="card article">
  <img class="article-thumb" src={articleResult.thumb} alt={articleResult.title} />
  <header class="article-title">
    <h1>{articleResult.title}</h1>
    <div class="article-info">
      <time class="date" datetime="articleItem.ctime">{articleResult.ctime}</time>
      <span class="dot" />
      <span class="views">阅读数：{articleResult.views}</span>
    </div>
  </header>
  <p class="article-description">{articleResult.description}</p>
  <section class="article-content markdown-body">
    {@html articleResult.contentHtml}
  </section>
</article>

<style lang="less">
  @import '../../styles/vars.less';
  .article {
    padding: 0;
    margin-bottom: 20px;
    overflow: hidden;
    .article-thumb {
      height: 233px;
      width: 100%;
      object-fit: cover;
      display: block;
    }
    .article-title {
      padding: 18px;
      h1 {
        font-weight: 400;
        font-size: 1.8em;
        line-height: 1;
        color: @title;
      }
    }
    .article-info {
      color: @subtitle;
      padding-top: 16px;
    }
    .article-description {
      padding: 0 18px;
      font-size: 16px;
      color: rgb(36, 41, 46);
    }
  }
  .markdown-body {
    padding: 18px;
  }
</style>
