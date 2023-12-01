import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentModule } from 'src/payment/payment.module';
import { GroupsService } from './groups.service';
import { GroupStudents } from './model/group-students.model';
import { Group } from './model/group.model';
import { Teacher } from '../teacher/model/teacher.model';
import { GroupLesson } from './model/group-lessons';
import { GroupsController } from './groups.controller';
import { Student } from '../student/model/student.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Group,
      GroupStudents,
      Teacher,
      GroupLesson,
      Student,
    ]),
    PaymentModule,
  ],
  providers: [GroupsService],
  exports: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {
  constructor() {}
}
