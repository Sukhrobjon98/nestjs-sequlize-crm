import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { GroupLesson } from 'src/groups/model/group-lessons';
import { Student } from 'src/student/model/student.model';

export enum Status {
  PRESENT = 1,
  ABSENT = 2,
  EXCUSED = 3,
  LATE = 4,
}

@Table({ tableName: 'student_attendances', timestamps: true })
export class StudentAttendance extends Model {
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Student)
  @Column({ type: DataTypes.INTEGER.UNSIGNED, allowNull: false })
  student_id: number;
  @BelongsTo(() => Student)
  student: Student;

  @ForeignKey(() => GroupLesson)
  @Column({ type: DataTypes.INTEGER.UNSIGNED })
  group_lesson_id: number;
  @BelongsTo(() => GroupLesson, 'group_lesson_id')
  group_lesson: GroupLesson;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: Status.PRESENT,
  })
  status: Status;

  @Column({ type: DataTypes.STRING(255) })
  comment: string;
}
