import { SequelizeModule } from '@nestjs/sequelize';
import { StudentService } from './student.service';
import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { Student } from './model/student.model';
import { GroupsModule } from 'src/groups/groups.module';
import { PaymentModule } from 'src/payment/payment.module';
import { AttendancesModule } from 'src/student_attendances/attendances.module';
@Module({
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService],
  imports: [SequelizeModule.forFeature([Student]), GroupsModule, PaymentModule,AttendancesModule],
})
export class StudentModule {}
