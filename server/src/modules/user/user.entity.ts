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
  id: number;

  /**
   * 名字
   */
  @Column()
  name: string;

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
   * 密码
   */
  @Column({ default: '123456' })
  password: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
