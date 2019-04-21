import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn({ comment: '用户id' })
  uid: number;

  @Column({ unique: true, comment: '账号' })
  username: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({ nullable: true, comment: '签名' })
  slogan: string;

  @Column({ nullable: true, comment: '头像' })
  avatar: string;

  @CreateDateColumn({ comment: '创建时间' })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间' })
  utime: Date;
}
