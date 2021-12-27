import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('post_requests')
export class PostRequest {
  @PrimaryColumn()
  id: string;

  @Column()
  authorId: string;

  @Column()
  approverId: string;

  @Column()
  status: string;

  @Column()
  newsId: string;

  @Column()
  projectId: string;

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