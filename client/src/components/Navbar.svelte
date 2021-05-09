<script lang="ts"></script>

<nav class="navbar">
  <div class="navbar-container">
    <a class="navbar-logo navbar-item" href="/">橘子的Blog</a>
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/">首页</a>
        <a class="navbar-item" href="/archives">归档</a>
        <a class="navbar-item" href="/tags">标签</a>
        <a class="navbar-item" href="/links">友链</a>
      </div>
      <div class="navbar-end">
        <a href="/search" class="navbar-item navbar-search">搜索</a>
      </div>
    </div>
  </div>
</nav>

<style lang="less">
  .navbar {
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 2, 4, 0.06), 0 0 1px rgba(0, 2, 4, 0.11);
 
    .navbar-container {
      width: 1400px;
      height: 56px;
      margin: 0 auto;
      display: flex;
      align-items: center;
    }
    .navbar-start,
    .navbar-end {
      height: 100%;
      display: flex;
    }
    .navbar-menu {
      height: 100%;
      flex: 1 1 0;
      display: flex;
      justify-content: space-between;
    }
    .navbar-item {
      padding: 0 10px;
      outline: none;
      color: #37475b;
      font-size: 15px;
      display: flex;
      align-items: center;
      &:focus,
      &:hover {
        background-color: #eceef2;
        color: #3273dc;
      }
    }
    .navbar-logo {
      margin-right: 10px;
      height: 100%;
      line-height: 100%;
      font-size: 20px;
      color: #37475b;
    }
  }
</style>
