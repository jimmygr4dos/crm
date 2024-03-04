import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  date: Date;

  @Column()
  customerId: number;

  @Column()
  contactId: number;

  @Column()
  customerAddress: string;

  @Column()
  deliveryTime: number;

  @Column()
  paymentOptionId: number;

  @Column()
  taxIncluded: boolean;

  @Column({ default: () => 'A DOMICILIO' })
  deliveryOption: string;

  @Column()
  vendorId: number;

  @Column({ default: () => '10 DÍAS CALENDARIOS' })
  quotationValidity: string;

  @Column()
  status: number;

  @Column()
  observation: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ nullable: true })
  createdBy: string
}
