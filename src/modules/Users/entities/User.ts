import { Exclude } from 'class-transformer';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  isAdmin: boolean;

  @Column()
  @Exclude()
  password: string;

  @Column('text', { nullable: true })
  RA: string;

  @Column('text', { nullable: true })
  image: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}