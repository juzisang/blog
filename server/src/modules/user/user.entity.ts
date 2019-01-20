import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  /**
   * 用户id
   */
  @PrimaryGeneratedColumn({ comment: '用户id' })
  uid: number;

  /**
   * 名字
   */
  @Column({ unique: true, comment: '账号' })
  name: string;

  /**
   * 密码
   */
  @Column({ comment: '密码' })
  password: string;

  /**
   * 签名
   */
  @Column({ nullable: true, comment: '签名' })
  slogan: string;

  /**
   * 头像
   */
  @Column({ nullable: true, comment: '头像' })
  avatar: string;

  /**
   * 创建时间
   */
  @CreateDateColumn({ comment: '创建时间' })
  create_time: Date;

  /**
   * 修改时间
   */
  @UpdateDateColumn({ comment: '修改时间' })
  update_time: Date;
}
