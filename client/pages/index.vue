<template>
  <div class="index">
    <ArticleList></ArticleList>
    <Links class="mt-4"></Links>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleList from '../components/ArticleList.vue'
import Links from '../components/Links.vue'

export default defineComponent({
  components: {
    ArticleList,
    Links,
  },
})
</script>