<template>
  <div class="article-list">
    <ArticleItem
      :article="item"
      :key="item.cid"
      v-for="item in articles"/>
  </div>
</template>

<script>
  import ArticleItem from './ArticleItem'

  export default {
    name: 'article-list',
    props: {
      articles: Array
    },
    components: {
      ArticleItem
    }
  }
</script>

<style scoped>
  .article-list {
  }
</style>
