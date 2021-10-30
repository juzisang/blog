<template>
  <div class="newest w-full shadow-md rounded bg-white p-4 pb-2 sticky">
    <h2 class="text-lg flex flex-row items-center items-centerfont-medium">
      <div class="border-l-4 border-blue-400 h-4 pr-3"></div>
      最新评论
    </h2>
    <ul class="divide-y divide-gray-100">
      <li class="py-3" v-for="i in 8" :key="i">
        <div class="flex justify-between">
          <a class="flex items-center" href="">
            <img class="rounded-full w-8 h-8" src="https://cravatar.cn/avatar/6a5391a5d94bf42054dcdd56ddf2e3b1?s=60&r=g" alt="" />
            <span class="text-base text-gray-500 pl-2">ColorFul</span>
          </a>
          <span class="flex items-center text-gray-400">2021年10月12日</span>
        </div>
        <p class="bg-gray-100 my-3 p-3 text-gray-400">非常好用，就是不太懂，为啥我显卡3个风扇只能识别出来2个。。</p>
        <p class="truncate text-gray-400">评论于：<NuxtLink to="/">未来可期？——小米平板5 Pro 简单上手</NuxtLink></p>
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