<template>
  <header class="header bg-white shadow fixed z-10 left-0 right-0">
    <div class="container mx-auto px-4 flex justify-between h-16 items-center">
      <h1 class="logo font-semibold text-2xl text-gray-800"><NuxtLink to="/">橘子的Blog</NuxtLink></h1>
      <div class="right-controller flex">
        <ul class="header-menus contents font-medium text-base">
          <li class="menu px-4"><NuxtLink to="/categorys">分类</NuxtLink></li>
          <li class="menu px-4"><NuxtLink to="/tags">标签</NuxtLink></li>
          <li class="menu px-4"><NuxtLink to="/archives">归档</NuxtLink></li>
          <li class="menu px-4"><NuxtLink to="/links">友链</NuxtLink></li>
          <li class="menu px-4"><NuxtLink to="/about">关于</NuxtLink></li>
        </ul>
        <NuxtLink class="ml-4" to="/search"><img class="w-6 h-6" src="../assets/images/icon-search.png" alt="搜索" /></NuxtLink>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
</style>

