import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes, IntegerDataType } from 'sequelize';
import { Timestamp } from 'rxjs';

@Table({ tableName: 'courses' })
export class Course extends Model {
  @Column({ type: DataTypes.STRING(255) })
  slug: string;

  @Column({ type: DataTypes.STRING(255) })
  poster: string;

  @Column({ type: DataTypes.BIGINT.UNSIGNED })
  price: number;

  @Column({ type: DataTypes.INTEGER.UNSIGNED })
  students: number;

  @Column({ type: DataTypes.DOUBLE(8, 2).UNSIGNED })
  duration: number;

  @Column({ type: DataTypes.BIGINT.UNSIGNED })
  creator_id: number;

  @Column({ type: DataTypes.INTEGER })
  priority: number;

  @Column({ type: DataTypes.TINYINT })
  is_featured: number;

  @Column({ type: DataTypes.STRING(255) })
  video_embed: string;

  @Column({ type: DataTypes.JSON })
  title: string;

  @Column({ type: DataTypes.JSON })
  short: string;

  @Column({ type: DataTypes.JSON })
  description: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
