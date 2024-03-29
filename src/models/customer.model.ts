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

  @Column()
  status: number

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ nullable: true })
  createdBy: number

  @Column({ nullable: true })
  modifiedAt: Date

  @Column({ nullable: true })
  modifiedBy: number

}
