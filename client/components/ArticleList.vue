<template>
  <ul class="archive-list w-full shadow-md rounded divide-y divide-gray-100">
    <li v-for="item in data.list" :key="item.id">
      <ArticleItem :item="item"></ArticleItem>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleItem from './ArticleItem.vue'
import useData from '@/composables/useData'

export default defineComponent({
  components: {
    ArticleItem,
  },
  async setup() {
    const { data } = await useData('/api/article')
    return data
  },
})
</script>

<style lang="scss">
</style>