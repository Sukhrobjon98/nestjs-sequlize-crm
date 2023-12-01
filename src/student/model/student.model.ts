import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { GroupStudents } from '../../groups/model/group-students.model';
import { Group } from '../../groups/model/group.model';

@Table({ tableName: 'students' })
export class Student extends Model<Student> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birth_date?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  number?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  parent_name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  parent_phone?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  raw_password?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  parent_password?: string;

  @BelongsToMany(() => Group, () => GroupStudents)
  groups: Group[];
}
