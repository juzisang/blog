<template>
  <article class="archive-item w-full flex flex-row p-4 bg-white">
    <div class="w-60 h-36 mr-4 flex-shrink-0 box-border overflow-hidden rounded">
      <NuxtLink :to="{ name: 'article-id', params: { id: item.id } }"> <img class="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110" :src="item.thumb" alt="" /> </NuxtLink>
    </div>
    <div class="flex flex-col flex-grow overflow-hidden items-stretch py-1">
      <h4 class="text-xl w-full text-2-ellipsis pr-2 font-medium">
        <NuxtLink :to="{ name: 'article-id', params: { id: item.id } }">{{ item.title }}</NuxtLink>
      </h4>
      <p class="text-base text-2-ellipsis pt-2 pr-2 text-gray-500">
        {{ item.description }}
      </p>
      <p class="text-xs text-gray-400 flex-grow flex items-end">{{ item.ctime }}</p>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PropType } from 'vue'
import { IArticle } from '@/app.interface'

export default defineComponent({
  props: {
    type: Object as PropType<IArticle>,
  },
  setup() {},
})
</script>

<style lang="scss">
</style>