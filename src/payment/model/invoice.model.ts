import { DataTypes } from 'sequelize';
import {
  Column,
  Table,
  Model,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Group } from 'src/groups/model/group.model';
import { Student } from 'src/student/model/student.model';
import { Payment } from './payment.model';

@Table({ tableName: 'course_invoices', timestamps: false })
export class Invoice extends Model {
  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Student)
  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  })
  student_id: number;

  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  })
  course_id: number;

  @Column({
    type: DataTypes.DATE,
    allowNull: true,
  })
  created_at?: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: true,
  })
  updated_at?: Date;

  @ForeignKey(() => Group)
  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  })
  group_id: number;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  period: string;

  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  })
  price: number;

  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  })
  paid: number;

  @Column({
    type: DataTypes.TINYINT({ length: 1 }),
    allowNull: false,
    defaultValue: 0,
  })
  is_paid: number;

  @ForeignKey(() => Payment)
  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
  })
  payment_id: number;

  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
  })
  discount: number;

  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
  })
  discount_percent: number;

  @Column({
    type: DataTypes.TEXT,
  })
  comment: string;

  @Column({
    type: DataTypes.BIGINT,
  })
  price_with_discount: number;

  @Column({
    type: DataTypes.BIGINT,
  })
  unpaid: number;

  @HasMany(() => Payment, 'payable_id')
  payments: Payment[];

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => Group)
  group: Group;
}
