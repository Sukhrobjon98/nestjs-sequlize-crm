import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { GroupStudents } from './group-students.model';
import { Teacher } from '../../teacher/model/teacher.model';
import { Student } from '../../student/model/student.model';

@Table({ tableName: 'groups', timestamps: false })
export class Group extends Model {
  @Column({ type: DataTypes.BIGINT.UNSIGNED, allowNull: false })
  course_id: number;

  @Column({ type: DataTypes.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0 })
  price: number;

  @Column({ type: DataTypes.DATE })
  group_start: Date;

  @Column({ type: DataTypes.DATE })
  group_finish: Date;

  @Column({ type: DataTypes.BIGINT.UNSIGNED })
  @ForeignKey(() => Teacher)
  teacher_id: number;

  @BelongsTo(() => Teacher)
  teacher: Teacher;

  @Column({ type: DataTypes.TIME, allowNull: false })
  lesson_time: Date;

  @Column({
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  })
  lessons_count: number;

  @Column({
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  })
  lessons_per_month: number;

  @Column({ type: DataTypes.TINYINT, allowNull: false })
  days: number;

  @BelongsToMany(() => Student, () => GroupStudents)
  students: Student[];
}
