<template>
  <div class="Home">
    <el-container>
      <el-header class="header">
        <div class="blog-name">博客管理系统</div>
        <div class="menu-list">
          <div class="message"><i class="el-icon-message"></i>消息</div>
          <div class="menu-dropdown">
            <img src="https://avatars2.githubusercontent.com/u/14973323?s=460&v=4" class="icon"/>
            <el-dropdown size="medium">
              <div class="dropdown">
                <div class="name">橘子桑</div>
                <i class="el-icon-caret-bottom" style="padding-left:4px;"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :router="true"
            style="border: none"
            :default-active="$route.fullPath"
            background-color="rgba(0,0,0,0)"
            text-color="#fff"
            active-text-color="#3080FE">
            <el-menu-item index="/home">
              <i style="width: 29px;display: inline-block;">
                <img src="~src/assets/imgs/icon_home.png" width="18" height="18"/>
              </i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-submenu index="/tag">
              <template slot="title">
                <i style="width: 29px;display: inline-block;">
                  <img src="~src/assets/imgs/icon_tag.png" width="18" height="18"/>
                </i>
                <span slot="title">标签管理</span>
              </template>
              <el-menu-item index="/tag/list" class="children-item">分类列表</el-menu-item>
              <el-menu-item index="/tag/create" class="children-item">新建分类</el-menu-item>
            </el-submenu>
            <el-submenu index="/category">
              <template slot="title">
                <i style="color: #fff" class="el-icon-menu"></i>
                <span>分类管理</span>
              </template>
              <el-menu-item index="/category/list" class="children-item">分类列表</el-menu-item>
              <el-menu-item index="/category/create" class="children-item">新建分类</el-menu-item>
            </el-submenu>
            <el-submenu index="/article">
              <template slot="title">
                <i style="color: #fff" class="el-icon-edit-outline"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item index="/article/list" class="children-item">文章列表</el-menu-item>
              <el-menu-item index="/article/create" class="children-item">新建文章</el-menu-item>
            </el-submenu>
            <el-submenu index="/page">
              <template slot="title">
                <i style="color: #fff" class="el-icon-edit-outline"></i>
                <span>页面管理</span>
              </template>
              <el-menu-item index="/page/create-article" class="children-item">新建页面</el-menu-item>
              <el-menu-item index="/page/edit-article" class="children-item">页面列表</el-menu-item>
            </el-submenu>
            <el-submenu index="/setting">
              <template slot="title">
                <i style="color: #fff" class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="/setting/base" class="children-item">基本设置</el-menu-item>
              <el-menu-item index="/setting/user" class="children-item">个人设置</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    mixins: [],
    props: {},
    components: {},
    data () {
      return {}
    },
    computed: {},
    mounted () {
    },
    methods: {},
    watch: {},
    beforeDestroy () {
    }
  }
</script>

<style lang="scss" scoped>
  .Home {
    color: #666;
    max-width: 1200px;
    margin: 0 auto;
    .header {
      height: 80px !important;
      color: #fff;
      .blog-name {
        line-height: 80px;
        height: 80px;
        font-size: 32px;
        color: #3080FE;
        float: left;
      }
      .menu-list {
        line-height: 80px;
        height: 80px;
        float: right;
        > div {
          float: left;
          min-width: 100px;
          cursor: pointer;
        }
        .message {
          height: 80px;
          i {
            padding-right: 6px;
          }
          &:hover {
            color: #3080FE;
          }
        }
        .menu-dropdown {
          height: 80px;
          width: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          .icon {
            width: 48px;
            height: 48px;
            border-radius: 8px;
          }
          .name {
            padding-left: 8px;
          }
          .dropdown {
            height: 35px;
            line-height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
          }
        }
      }
    }
    .children-item {
      padding-left: 54px !important;
    }
  }
</style>

