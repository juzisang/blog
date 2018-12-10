import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('metas')
export class MetasEntity {
  @PrimaryGeneratedColumn()
  mid: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ['tag', 'category'] })
  type: string;

  @CreateDateColumn({ select: false })
  create_time: Date;

  @UpdateDateColumn({ select: false })
  update_time: Date;
}
