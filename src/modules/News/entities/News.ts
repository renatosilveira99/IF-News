import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('news')
export class News {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column()
  extraLink: string;

  @Column()
  campus: string;

  @Column()
  authorId: string;

  @Column()
  coverImage: string;

  @Column()
  images: string;

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