export default {
  db: {
    type: 'mysql',
    host: process.env.BLOG_MYSQL_HOST || 'localhost',
    port: process.env.BLOG_MYSQL_PORT || 3306,
    username: process.env.BLOG_MYSQL_USER || 'developer',
    password: process.env.BLOG_MYSQL_PASSWORD || 'developer',
    database: process.env.BLOG_MYSQL_DATABASE || 'blog',
    entities: ['src/**/**.entity{.ts,.js}'],
    synchronize: true,
  },
  defaultData: {
    user: {
      name: process.env.BLOG_USER_NAME || 'root',
      avatar: process.env.BLOG_USER_AVATAR || '',
      slogan: process.env.BLOG_USER_SLOGAN || '',
      password: process.env.BLOG_USER_PASSWORD || '123456',
    },
    option: {
      title: process.env.BLOG_OPTION_NAME || '橘子的blog',
      sub_title: process.env.BLOG_OPTION_SUB_TITLE || '橘子的blog',
      keywords: process.env.BLOG_OPTION_KEYWORDS || [
        'blog',
        'html5',
        'javascript',
        'typescript',
      ],
      description: process.env.BLOG_OPTION_DESCRIPTION || '记录一些技术文章',
      site_url: process.env.BLOG_OPTION_SITE_URL || 'https://www.juzisang.top/',
      site_email: process.env.BLOG_OPTION_SITE_EMAIL || 'juziexe@gmail.com',
    },
  },
};
