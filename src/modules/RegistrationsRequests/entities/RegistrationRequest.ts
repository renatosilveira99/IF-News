import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('registration_requests')
export class RegistrationRequest {
  @PrimaryColumn()
  id: string;

  @Column()
  approverId: string;
 
  @Column()
  userId: string;

  @Column()
  status: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}