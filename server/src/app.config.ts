import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

export const APP = {
  host: 3000,
  origin: process.env.BLOG_APP_ORIGIN || 'http://localhost:3000/',
  staticPath: path.join(__dirname, '../static'),
  uploadPath: path.join(__dirname, '../static/files'),
};

/**
 * 初始化数据
 */
export const DEFAULT_DATA = {
  // 用户
  user: {
    name: process.env.BLOG_USER_NAME || 'root',
    password: process.env.BLOG_USER_PASSWORD || '123456',
  },
  // 配置
  option: {
    title: process.env.BLOG_OPTION_TITLE || '',
    subTitle: process.env.BLOG_OPTION_SUBTITLE || '',
    keywords: process.env.BLOG_OPTION_KEYWORDS || '',
    description: process.env.BLOG_OPTION_DESCRIPTION || '',
    siteUrl: process.env.BLOG_OPTION_SITEURL || '',
    siteEmail: process.env.BLOG_OPTION_SITEEMAIL || '',
  },
};

/**
 * 环境
 */
export const ENV = {
  isDev: Object.is(process.env.NODE_ENV, 'development'),
  isProd: Object.is(process.env.NODE_ENV, 'production'),
};

/**
 * DB配置
 */
export const DB: ConnectionOptions = {
  type: 'mysql',
  host: process.env.BLOG_MYSQL_HOST || 'localhost',
  port: (process.env.BLOG_MYSQL_PORT as any) || 3306,
  username: process.env.BLOG_MYSQL_USER || 'developer',
  password: process.env.BLOG_MYSQL_PASSWORD || 'developer',
  database: process.env.BLOG_MYSQL_DATABASE || 'blog',
  charset: 'utf8_general_ci',
  entities: ['src/**/**.entity{.ts,.js}'],
  synchronize: true,
  extra: { charset: 'utf8_general_ci' },
  logging: true,
};

/**
 * JWT
 */
export const JWT = {
  secretKey: process.env.BLOG_JWT_SECRETKEY || 'secretKey',
};
