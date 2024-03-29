import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity({ name: 'budgets' })
export class Budget {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  subtotal: number;

  @Column()
  margin: number;

  @Column()
  utility: number;

  @Column()
  total: number;

  @Column()
  price: number;

  @Column()
  unitPrice: number;

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
