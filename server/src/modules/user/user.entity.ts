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
  @Column({ unique: true })
  name: string;

  /**
   * 密码
   */
  @Column()
  password: string;

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

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
