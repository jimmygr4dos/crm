import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Contact } from '../../contacts/models/contact.model';

@Entity({ name: 'customers' })
export class Customer {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  tinNumber: string

  @Column({ unique: true })
  companyName: string

  @Column()
  address: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ nullable: true })
  createdBy: string
}
