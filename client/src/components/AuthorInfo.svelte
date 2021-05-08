<script lang="ts">
  import type { IUserInfo } from '../api.interface'

  export let userInfo: IUserInfo
</script>

<div class="author-info card">
  <img class="author-avatar" loading="lazy" src={userInfo.info.avatar} alt="" />
  <div class="author-name">{userInfo.info.authorName}</div>
  {#if userInfo.info.slogan}<p class="author-slogan">{userInfo.info.slogan}</p>{/if}
  <ul class="author-data">
    <li class="author-data-count">
      <p class="count">{userInfo.articleCount}</p>
      <p class="type-name">文章</p>
    </li>
    <li class="author-data-count">
      <p class="count">{userInfo.categoryCount}</p>
      <p class="type-name">分类</p>
    </li>
    <li class="author-data-count">
      <p class="count">{userInfo.tagCount}</p>
      <p class="type-name">标签</p>
    </li>
  </ul>
</div>

<style lang="less">
  .author-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .author-avatar {
    width: 96px;
    height: 96px;
    border-radius: 96px;
  }
  .author-name {
    font-size: 22px;
    font-weight: 400;
    padding-top: 12px;
  }
  .author-slogan {
    padding-top: 10px;
    font-size: 16px;
  }
  .author-data {
    display: flex;
    width: 100%;
    padding-top: 16px;
  }
  .author-data-count {
    width: 33.333333%;
    text-align: center;
    .count {
      font-size: 21px;
    }
    .type-name {
      font-size: 14px;
    }
  }
</style>
