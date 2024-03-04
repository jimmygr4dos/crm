import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
