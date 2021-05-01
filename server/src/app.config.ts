import * as dotenv from 'dotenv'

dotenv.config()

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  BLOG_SITE_ORIGIN: process.env.BLOG_SITE_ORIGIN,
  APP_PORT: parseInt(process.env.APP_PORT),
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT),
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_DATABASE: process.env.DATABASE_DATABASE,
  JWT_SECRET: process.env.JWT_SECRET,
  USER_ADMIN_NAME: process.env.USER_ADMIN_NAME,
  USER_ADMIN_PASSWORD: process.env.USER_ADMIN_PASSWORD,
}
