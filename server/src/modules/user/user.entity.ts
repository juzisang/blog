import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @ApiProperty({ description: '账号' })
  @Column({ comment: '账号', unique: true })
  username: string;

  @Column({ comment: '密码', select: false })
  password: string;

  @ApiProperty({ description: '签名' })
  @Column({ comment: '签名', nullable: true })
  slogan: string;

  @ApiProperty({ description: '头像' })
  @Column({ comment: '头像', nullable: true })
  avatar: string;

  @ApiProperty({ description: '额外字段' })
  @Column({ comment: '额外字段', type: 'json', nullable: true })
  extra: string;

  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: Date;
}
