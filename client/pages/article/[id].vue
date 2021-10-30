<template>
  <article class="article bg-white rounded h-full p-7">
    <h1 class="title text-2xl font-medium">{{ data.title }}</h1>
    <div class="flex text-gray-400 text-base py-6">
      <span class="pr-2">{{ data.ctime }}</span
      >·<span class="px-2">{{ data.category.alias }}</span
      >·<span class="pl-2">阅读 {{ data.viewNumber }}</span>
    </div>
    <div class="content markdown-body" v-html="data.content"></div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useData from '@/composables/useData'

export default defineComponent({
  async setup() {
    const $route = useRoute()
    const { data } = await useData(`/api/article/${$route.params.id}`)
    return {
      data,
    }
  },
})
</script>

<style lang="scss">
@import 'github-markdown-css';
</style>