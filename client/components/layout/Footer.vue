<template>
  <div class="BlogFooter">
    <div class="social-list">
      <div class="footer-container">
        <a href="">WEIBO</a>
        <a href="">ZHIHU</a>
        <a href="">RSS</a>
        <a href="">GITHUB</a>
        <a href="">TWITTER</a>
      </div>
    </div>
    <div class="footer-meta">
      <div class="footer-container">
        <div class="meta-item meta-copyright">
          <a class="info-logo">橘子的Blog</a>
          <p>Theme is Pinghsu by Chakhsu</p>
          <p>Powered by Typecho</p>
          <p>© 2018 橘子的Blog</p>
        </div>
        <div class="meta-item meta-posts">
          <h3 class="mete-title">RECENT POSTS</h3>
          <ul>
            <li><a href="">Centos7下Guacamole安装配置</a></li>
            <li><a href="">群晖使用Frp实现内网穿透</a></li>
          </ul>
        </div>
        <div class="meta-item meta-comments">
          <h3 class="mete-title">RECENT COMMENTS</h3>
          <ul>
            <li><a href="">juzisang : 咦</a></li>
            <li><a href="">青花 : 哇</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BlogFooter'
  }
</script>

<style lang="scss" scoped>
  .BlogFooter {
    position: relative;
    padding-bottom: 50px;
    background: #FFFFFF;
    .social-list {
      border-bottom: 0.5px solid rgba(0, 0, 0, .1);
      .footer-container {
        max-width: 940px;
        text-align: center;
        margin: 0 auto;
        padding: 20px;
        a {
          font-size: 14px;
          padding: 0 25px;
        }
      }
    }
    .footer-meta {
      .footer-container {
        width: 100%;
        max-width: 940px;
        height: 250px;
        margin: 50px auto 0 auto;
        padding: 0 80px;
        box-sizing: border-box;
        .meta-item {
          width: 33.33333333%;
          height: 100%;
          padding: 0 30px;
          text-align: left;
          box-sizing: border-box;
          float: left;
          &.meta-copyright {
            .info-logo {
              color: #313131;
            }
            p {
              font-size: 14px;
              color: #767676;
            }
          }
          &.meta-posts, &.meta-comments {
            .mete-title {
              font-size: 14px;
              padding: 0 0 10px 0;
              text-decoration: none;
              color: #767676;
            }
            a {
              color: #767676;
            }
          }
        }
      }
    }
  }
</style>
