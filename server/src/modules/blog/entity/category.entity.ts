import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';

@Entity('category')
export class CategoryEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @ApiProperty({ description: '标签名' })
  @Column({ comment: '标签名' })
  name: string;

  @ApiProperty({ description: '别名' })
  @Column({ comment: '别名' })
  alias: string;

  @ApiProperty({ description: '描述' })
  @Column({ comment: '描述', nullable: true })
  description: string;

  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: Date;
}