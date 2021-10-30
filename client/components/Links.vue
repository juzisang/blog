<template>
  <div class="hot w-full shadow-md rounded bg-white py-4 pb-2">
    <h2 class="text-xl pl-4 flex flex-row items-center items-centerfont-medium">热门推荐</h2>
    <ul class="flex flex-wrap">
      <li v-for="i in 8" :key="i" class="p-4 text-gray-400">
        <a href="">365cent</a>
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