<template>
  <header class="BlogHeader">
    <div class="navbar-container">
      <nuxt-link to="/" class="navbar-name">{{blogName}}</nuxt-link>
      <div class="navbar-menu">
        <nuxt-link to="/article">Archives</nuxt-link>
        <nuxt-link to="/links">Links</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
      </div>
      <nuxt-link to="/search" class="navbar-search">
        <span class="iconfont icon-search"></span>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'BlogHeader',
    data () {
      return {
        blogName: '橘子的Blog'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/mixins.scss";
  @import "~@/assets/scss/variables.scss";

  .BlogHeader {
    height: 70px;
    line-height: 68px;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    background: #FFFFFF;
    text-align: right;
    @include box-shadow($color: rgba(0, 0, 0, .1));
    .navbar-container {
      position: relative;
      max-width: 100%;
      height: 70px;
      margin: 0 auto;
      font-size: 0;
      .navbar-name {
        font-size: 22px;
        line-height: 22px;
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        width: auto;
        max-width: 50%;
        height: 22px;
        margin-top: -10px;
        margin-left: 24px;
      }
      .navbar-menu {
        display: inline-block;
        padding-right: 6px;
        a {
          font-size: 14px;
          padding: 0 16px;
        }
      }
      .navbar-search {
        height: 70px;
        line-height: 70px;
        display: inline-block;
        width: 20px;
        margin: 0;
        padding: 0 40px 0 0;
        cursor: pointer;
        .icon-search {
          position: relative;
          z-index: 1;
          display: inline-block;
          width: 13px;
          height: 13px;
          margin: 2px 0 0 3px;
          color: #313131;
          &:hover {
            color: $selectionColor;
          }
        }
      }
    }
  }
</style>
