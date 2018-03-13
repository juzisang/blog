<template>
  <div class="article-item">
    <div class="item-thumb" :style="{backgroundImage: `url(${article.thumb || ''})`}">
      <p class="item-desc">{{article.content}}</p>
    </div>
    <div class="item-label">
      <div class="item-title">
        <nuxt-link :to="'/article/' + article.cid">{{article.title}}</nuxt-link>
      </div>
      <div class="item-tags">
        <div class="tag" v-for="tag in article.tags" :key="tag.mid">
          {{tag.name}}
        </div>
        <div class="tag-ico"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'article-item',
    props: {
      article: {
        type: Object
      }
    }
  }
</script>

<style scoped>
  .article-item {
    width: 33.333333%;
    height: auto;
  }
</style>
