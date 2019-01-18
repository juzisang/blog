import { ConnectionOptions } from 'typeorm';

export const APP = {
  host: 3000,
  origin: 'http://www.juzisang.top/',
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

/**
 * 初始化数据
 */
export const DEFAULT_DATA = {
  user: {
    name: process.env.BLOG_USER_NAME || 'root',
    password: process.env.BLOG_USER_PASSWORD || '123456',
  },
};
