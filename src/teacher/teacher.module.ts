import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from './model/teacher.model';
import { TeacherController } from './teacher.controller';
import { GroupsModule } from '../groups/groups.module';

@Module({
  providers: [TeacherService],
  exports: [TeacherService],
  controllers: [TeacherController],
  imports: [SequelizeModule.forFeature([Teacher]), GroupsModule],
})
export class TeacherModule {}
