import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'budgetItems' })
export class BudgetItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  unitId: number;

  @Column()
  unitCost: number;

  @Column()
  unitCostConfirmed: boolean;

  @Column()
  unitCostConfirmationDate: Date;

  @Column()
  totalCost: number;

  @Column()
  observation: string;

  @Column({ nullable: false })
  budgetId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ nullable: true })
  createdBy: string
}
