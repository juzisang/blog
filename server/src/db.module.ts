import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { config } from '@app/app.env';

export const DBModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: config.MYSQL_USERNAME,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  entityPrefix: 'blog_',
  charset: 'utf8_general_ci',
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  synchronize: true,
  logging: true,
});
