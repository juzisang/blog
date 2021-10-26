import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ArticleEntity } from './article.entity'
import { BaseEntity } from './base.entity'

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number

  @Column({ comment: '账号', unique: true })
  username: string

  @Column({ comment: '密码', select: false })
  password: string

  @Column({ comment: '头像', nullable: true })
  avatar: string

  @Column({ comment: '签名', nullable: true })
  slogan: string

  @Column({ comment: '网站地址', nullable: true })
  url: string

  @Column({ comment: '邮箱', nullable: true })
  mail: string

  @OneToMany(
    () => ArticleEntity,
    article => article.user,
  )
  articles: ArticleEntity[]
}
