import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
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
