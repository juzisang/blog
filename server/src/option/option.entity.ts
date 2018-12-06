import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('option')
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 标题
   */
  @Column()
  title: string;

  /**
   * 副标题
   */
  @Column()
  sub_title: string;

  /**
   * 搜索关键字
   */
  @Column()
  keywords: string;

  /**
   * 描述
   */
  @Column()
  description: string;

  /**
   * 站点地址
   */
  @Column()
  site_url: string;

  /**
   * 站点邮箱
   */
  @Column()
  site_email: string;
}
