import { ConnectionOptions } from 'typeorm';

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
 * 初始化数据
 */
export const DEFAULT_DATA = {
  user: {
    name: process.env.BLOG_USER_NAME || 'root',
    avatar: process.env.BLOG_USER_AVATAR || '',
    slogan: process.env.BLOG_USER_SLOGAN || '',
    password: process.env.BLOG_USER_PASSWORD || '123456',
    email: process.env.BLOG_USER_EMAIL || 'juziexe@gmail.com',
  },
  option: {
    title: process.env.BLOG_OPTION_NAME || '橘子的blog',
    sub_title: process.env.BLOG_OPTION_SUB_TITLE || '橘子的blog',
    keywords:
      process.env.BLOG_OPTION_KEYWORDS ||
      ['blog', 'html5', 'javascript', 'typescript'].join(','),
    description: process.env.BLOG_OPTION_DESCRIPTION || '记录一些技术文章',
    site_url: process.env.BLOG_OPTION_SITE_URL || 'https://www.juzisang.top/',
  },
};

/**
 * JWT
 */
export const JWT = {
  secretKey: process.env.BLOG_JWT_SECRETKEY || 'secretKey',
};
