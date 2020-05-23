import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({ comment: '账号', unique: true })
  username: string;

  @Column({ comment: '密码', select: false })
  password: string;

  @Column({ comment: '签名', nullable: true })
  slogan: string;

  @Column({ comment: '头像', nullable: true })
  avatar: string;

  @Column({ comment: '额外字段', type: 'json', nullable: true })
  extra: string;

  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: Date;
}
