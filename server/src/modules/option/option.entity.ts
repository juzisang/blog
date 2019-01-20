import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('option')
export class OptionEntity {
  /**
   * 用户所属id
   */
  @PrimaryColumn({ comment: '用户id' })
  uid: number;

  /**
   * 标题
   */
  @Column({ comment: '标题' })
  title: string;

  /**
   * 副标题
   */
  @Column({ comment: '副标题' })
  sub_title: string;

  /**
   * 搜索关键字
   */
  @Column({ comment: '关键字' })
  keywords: string;

  /**
   * 描述
   */
  @Column({ comment: '描述' })
  description: string;

  /**
   * 站点 URL
   */
  @Column({ comment: '站点URL' })
  site_url: string;

  /**
   * 站点邮箱
   */
  @Column({ comment: '邮箱' })
  site_email: string;
}
