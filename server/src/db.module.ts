import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export const DBModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: 'utf8_general_ci',
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  synchronize: true,
  logging: true,
});
