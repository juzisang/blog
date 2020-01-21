<template>
  <div class="blog-header">
    <div class="blog-header-container">
      <h2 class="blog-title">
        <nuxt-link to="/">橘子的Blog</nuxt-link>
      </h2>
      <div class="blog-menu">
        <nuxt-link to="/">归档</nuxt-link>
        <nuxt-link to="/">友链</nuxt-link>
        <nuxt-link to="/">留言板</nuxt-link>
        <div class="blog-search">
          <nuxt-link to="/">
            <img class="icon-search" src="@/assets/images/search.svg">
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BlogHeader extends Vue {}
</script>

<style lang="scss">
.blog-header {
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  right: 0;

  .blog-header-container {
    height: 70px;
    width: 1040px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 14px;
  }
  .blog-title {
    font-size: 20px;
  }
  .blog-menu {
    display: flex;
    font-size: 14px;
    a {
      padding: 0 15px;
    }
  }
  .icon-search {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
}
</style>
