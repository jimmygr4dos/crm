import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vendors' })
export class Vendor {

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
  commissionPercentage: number;
  
  @Column()
  currencyTypeId: number;
  
  @Column()
  salesQuota: number;

  @Column()
  observation: string;

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
