import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StudentAttendance } from './model/student_attendances';
import { StudentAttendanceDto } from './dto/student.attendance.dto';
import { GroupLesson } from 'src/groups/model/group-lessons';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectModel(StudentAttendance)
    private readonly attendances_model: typeof StudentAttendance,
  ) {}

  async groupAttendances(groupId: number) {
    return await this.attendances_model.findAll({
      attributes: ['id', 'group_lesson_id', 'status', 'comment'],
      include: [
        {
          model: GroupLesson,
          attributes: ['id', 'group_id', 'lesson_id', 'date'],
          where: { group_id: groupId },
        },
      ],
      raw: true,
    });
  }

  async studentLessonAttendance(id: number) {
    return await this.attendances_model.findAll({
      where: { group_lesson_id: id },
      attributes: ['id', 'group_lesson_id', 'status', 'comment'],
      raw: true,
    });
  }

  async studentAttendances(studentId: number, groupId: number) {
    let studentAttendance = await this.attendances_model.findAll({
      where: { student_id: studentId },
      attributes: ['id', 'group_lesson_id', 'status', 'comment'],
      include: [
        {
          model: GroupLesson,
          attributes: ['id', 'name', 'group_id', 'started_at'],
          where: { group_id: groupId },
        },
      ],
      raw: true,
    });

    return studentAttendance;
  }

  async createAttendance(
    attendanceData: StudentAttendanceDto[],
  ): Promise<StudentAttendance[]> {
    const attendance = attendanceData.map((attendance) => {
      return {
        student_id: attendance.student_id,
        group_lesson_id: attendance.group_lesson_id,
        status: attendance.status,
        comment: attendance.comment,
      };
    });
    return await this.attendances_model.bulkCreate(attendance);
  }
}
