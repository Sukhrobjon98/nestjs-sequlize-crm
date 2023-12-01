import { DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Group } from './group.model';

@Table({ tableName: 'group_lessons', timestamps: true })
export class GroupLesson extends Model {
  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataTypes.STRING(255), allowNull: false })
  name: string;
  @ForeignKey(() => Group)
  @Column({ type: DataTypes.BIGINT.UNSIGNED, allowNull: false })
  group_id: number;
  @Column({ type: DataTypes.DATE, allowNull: false })
  started_at: Date;
}
