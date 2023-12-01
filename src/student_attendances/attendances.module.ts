import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentAttendance } from './model/student_attendances';

@Module({
  imports: [SequelizeModule.forFeature([StudentAttendance])],
  providers: [AttendancesService],
  exports: [AttendancesService],
})
export class AttendancesModule {}
