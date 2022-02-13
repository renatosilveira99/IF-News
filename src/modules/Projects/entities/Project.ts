import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('projects')
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

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

  @Column('numeric', { nullable: true })
  views: number;

  @Column('numeric', { nullable: true })
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