import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('news')
export class News {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column('text', { nullable: true })
  extraLink: string;

  @Column()
  campus: string;

  @Column()
  authorId: string;

  @Column()
  coverImage: string;

  @Column('text', { nullable: true })
  images: string;

  @Column('number', { nullable: true })
  views: number;

  @Column('number', { nullable: true })
  likes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}