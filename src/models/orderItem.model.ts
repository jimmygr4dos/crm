import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orderItems' })
export class OrderItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  unitId: number;

  @Column()
  description: string;

  @Column()
  unitPrice: number;

  @Column()
  totalPrice: number;

  @Column()
  status: number;

  @Column()
  observation: string;

  @Column({ nullable: false })
  orderId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ nullable: true })
  createdBy: string
}
