<template>
  <header class="header">
    <div class="header-controller controller">
      <h1 class="logo"><NuxtLink to="/">橘子的Blog</NuxtLink></h1>
      <div class="right-controller">
        <ul class="header-menus">
          <li class="menu"><NuxtLink to="/categorys">分类</NuxtLink></li>
          <li class="menu"><NuxtLink to="/tags">标签</NuxtLink></li>
          <li class="menu"><NuxtLink to="/archives">归档</NuxtLink></li>
          <li class="menu"><NuxtLink to="/links">友链</NuxtLink></li>
          <li class="menu"><NuxtLink to="/about">关于</NuxtLink></li>
        </ul>
        <NuxtLink to="/search"><img class="search" src="../assets/images/icon-search.png" alt="搜索" /></NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.header {
  height: 64px;
  background: #fff;
}
.header-controller {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-size: 26px;
  font-weight: 500;
}

.right-controller {
  display: flex;
  align-items: center;
}

.header-menus {
  display: flex;
  margin-right: 16px;
  .menu {
    margin: 0 16px;
  }
}
.search {
  width: 24px;
  height: 24px;
}
</style>

