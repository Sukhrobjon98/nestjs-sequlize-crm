import { DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Group } from './group.model';
import { Student } from '../../student/model/student.model';

@Table({ tableName: 'group_students', timestamps: false })
export class GroupStudents extends Model {
  @ForeignKey(() => Group)
  @Column({
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  })
  group_id: number;

  @ForeignKey(() => Student)
  @Column({ type: DataTypes.BIGINT.UNSIGNED, allowNull: false })
  student_id: number;
  @Column({ type: DataTypes.TINYINT })
  student_interest: number;
  @Column({ type: DataTypes.BIGINT.UNSIGNED })
  student_fee: number;
  @Column({ type: DataTypes.DATE })
  study_start: Date;
  @Column({ type: DataTypes.DATE })
  study_finish: Date;
}
