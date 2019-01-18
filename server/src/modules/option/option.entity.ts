import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('option')
export class OptionEntity {
  @PrimaryColumn()
  uid: number;

  @Column()
  title: string;

  @Column()
  sub_title: string;

  @Column()
  keywords: string;

  @Column()
  description: string;

  @Column()
  site_url: string;

  @Column()
  site_email: string;
}
