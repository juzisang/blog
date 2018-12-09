import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  uid: number;

  /**
   * 名字
   */
  @Column()
  name: string;

  /**
   * 密码
   */
  @Column()
  password: string;

  /**
   * 邮箱
   */
  @Column()
  email: string;

  /**
   * 签名
   */
  @Column({ nullable: true })
  slogan: string;

  /**
   * 头像
   */
  @Column({ nullable: true })
  avatar: string;

  /**
   * 网站url
   */
  @Column({ nullable: true })
  url: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
