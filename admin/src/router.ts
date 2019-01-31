import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Layout from './views/layout/Layout';
import EmptyRouter from '@/components/EmptyRouter/EmptyRouter';

Vue.use(Router);

export const globalRouter: RouteConfig[] = [
  {
    name: 'Login',
    path: '/login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/Login'),
  },
];

export const homeRouter: RouteConfig[] = [
  {
    name: 'Articles',
    path: 'articles',
    meta: {
      title: '文章管理',
      icon: 'create',
    },
    component: EmptyRouter,
    children: [
      {
        name: 'ArticleList',
        path: 'articleList',
        meta: {
          title: '所有文章',
          icon: 'toc',
        },
        component: () => import('@/views/article/ArticleList'),
      },
      {
        name: 'ArticleList',
        path: 'articleList',
        meta: {
          title: '发布文章',
          icon: 'create',
        },
        component: () => import('@/views/article/ArticleEdit'),
      },
      {
        name: 'Tag',
        path: 'tag',
        meta: {
          title: '标签管理',
          icon: 'loyalty',
        },
        component: () => import('@/views/article/Tag'),
      },
      {
        name: 'Category',
        path: 'category',
        meta: {
          title: '分类管理',
          icon: 'folder',
        },
        component: () => import('@/views/article/Category'),
      },
    ],
  },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...globalRouter,
    {
      path: '/',
      component: Layout,
      children: [...homeRouter],
    },
  ],
});
