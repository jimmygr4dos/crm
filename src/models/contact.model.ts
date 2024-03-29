import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contacts' })
export class Contact {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  personalPhone: number;

  @Column()
  businessPhone: number;

  @Column()
  personalEmail: string;

  @Column()
  businessEmail: string;

  @Column()
  observation: string;

  @Column({ nullable: false })
  customerId: number;

  @Column()
  status: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ nullable: true })
  createdBy: number

  @Column({ nullable: true })
  modifiedAt: Date

  @Column({ nullable: true })
  modifiedBy: number
}
