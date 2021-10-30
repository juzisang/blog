<template>
  <div class="hot w-full shadow-md rounded bg-white p-4 pb-2">
    <h2 class="text-lg flex flex-row items-center items-centerfont-medium">
      <div class="border-l-4 border-blue-400 h-4 pr-3"></div>
      热门推荐
    </h2>
    <ul class="pt-2 divide-y divide-gray-100">
      <li v-for="i in 8" :key="i" class="py-2">
        <article class="flex flex-row">
          <div class="w-28 h-16 flex-shrink-0 box-border rounded overflow-hidden mr-2">
            <NuxtLink to="/"> <img class="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110" src="https://gbstatic.djyde.com/blog/hang.jpg?x-oss-process=style/80" alt="" /> </NuxtLink>
          </div>
          <div class="flex flex-col flex-grow justify-between overflow-hidden">
            <h4 class="text-sm text-gray-700 w-full text-2-ellipsis"><NuxtLink to="/">【推荐网站】下载国外网盘+强大的离线下载站—offcloud.com </NuxtLink></h4>
            <p class="text-xs text-gray-400 pb-0.5">2017年3月20日</p>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
</style>