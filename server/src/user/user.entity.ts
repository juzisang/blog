import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 名字
   */
  @Column()
  name: string;

  /**
   * 签名
   */
  @Column()
  slogan: string;

  /**
   * 头像
   */
  @Column()
  avatar: string;

  /**
   * 密码
   */
  @Column({ default: '123456' })
  password: string;
}
