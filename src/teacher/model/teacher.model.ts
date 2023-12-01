import { DataTypes } from 'sequelize';
import { AllowNull, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Group } from '../../groups/model/group.model';

@Table({ tableName: 'teachers', timestamps: false })
export class Teacher extends Model {
  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  username: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  name?: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  password?: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  raw_password?: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  resume?: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  passport?: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  pinfl?: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  inn?: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  photo?: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  phone?: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  remember_token?: string;

  @Column({
    type: DataTypes.DECIMAL(8, 2).UNSIGNED,
    allowNull: false,
    defaultValue: 0.0,
  })
  salary_percent: number;

  @Column({ type: DataTypes.STRING, allowNull: true })
  phone2?: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  bio?: string;

  @HasMany(() => Group)
  groups: Group[];
}
