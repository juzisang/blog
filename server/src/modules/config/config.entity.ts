import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('config')
export class ConfigEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({ comment: 'Blog 名字' })
  name: string;

  @Column({ comment: '关键字' })
  keywords: string;

  @Column({ comment: 'logo' })
  logo: string;

  @CreateDateColumn({ comment: '创建时间' })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间' })
  utime: Date;
}
