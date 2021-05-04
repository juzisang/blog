import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('article_meta_relation')
export class ArticleMetaRelationEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number

  @Column({ comment: '文章ID' })
  article_id: string

  @Column({ comment: '标签或分类ID' })
  meta_id: string

  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: Date

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: Date
}
