import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'budgetQuantityByPanols' })
export class BudgetQuantityByPanol {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  panol: number;

  @Column()
  quantityByPanol: number;

  @Column()
  excess: number;

  @Column()
  subtotal: number;

  @Column()
  cut: number;

  @Column()
  total: number;

  @Column({ nullable: false })
  budgetId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ nullable: true })
  createdBy: string
}
