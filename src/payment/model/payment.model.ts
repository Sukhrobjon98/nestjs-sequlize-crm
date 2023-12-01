import { DataTypes } from 'sequelize';
import {
  Column,
  Table,
  Model,
  BelongsTo,
  HasOne,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { Invoice } from './invoice.model';

@Table({ tableName: 'payments' })
export class Payment extends Model {
  @Column({
    type: DataTypes.MEDIUMINT.UNSIGNED,
    defaultValue: 0,
    allowNull: false,
  })
  status: number;

  @Column({ type: DataTypes.DOUBLE.UNSIGNED, allowNull: false })
  amount: number;

  @Column({ type: DataTypes.STRING(255), allowNull: false })
  payer_type: string;

  @Column({ type: DataTypes.BIGINT.UNSIGNED, allowNull: false })
  payer_id: string;

  @Column({ type: DataTypes.STRING(255) })
  payable_type: string;

  @Column({ type: DataTypes.BIGINT.UNSIGNED })
  payable_id: string;

  @BelongsTo(() => Invoice, 'payable_id')
  invoice: Invoice;
}
