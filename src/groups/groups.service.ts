import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GroupStudents } from './model/group-students.model';
import { Group } from './model/group.model';
import { GroupLessonDto } from './dto/group.lesson.dto';
import { GroupLesson } from './model/group-lessons';
import { Teacher } from '../teacher/model/teacher.model';
import { Student } from '../student/model/student.model';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group)
    private readonly groupModel: typeof Group,
    @InjectModel(Student)
    private readonly studentModel: typeof Student,
    @InjectModel(GroupStudents)
    private readonly groupStudentsModel: typeof GroupStudents,
    @InjectModel(Teacher)
    private readonly teacherModel: typeof Teacher,
    @InjectModel(GroupLesson)
    private readonly groupLessonModel: typeof GroupLesson,
  ) {}

  async getGroupStudents(groupId: number): Promise<Group[]> {
    return await this.groupModel.findAll({
      where: { id: groupId },
      attributes: ['id', 'name', 'price'],
      include: [
        {
          model: this.studentModel,
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async getStudentGroups(studentId: number): Promise<GroupStudents[]> {
    return this.groupStudentsModel.findAll({
      where: { student_id: studentId },
      attributes: ['student_fee', 'study_start'],
      include: [
        {
          model: this.groupModel,
          attributes: ['id', 'name', 'days', 'lessons_count'],
        },
      ],
      raw: true,
    });
  }

  async getStudentGroup(groupId: number,studentId:number): Promise<Group> {

    const group: Group = await this.groupModel.findByPk(groupId);
    if (!group) {
      throw new HttpException('Not found', 404);
    }
    const groupStudent: GroupStudents = await this.groupStudentsModel.findOne({
      where: { group_id: groupId, student_id: studentId },
    });
    if (!groupStudent) {
      throw new HttpException('Sizga tegishli bo\'lmagan guruh', 401);
    }
    return group;
    
  }

  async getTeacherGroups(teacherId: number): Promise<Teacher[]> {
    return await this.teacherModel.findAll({
      where: { id: teacherId },
      attributes: ['id', 'name', 'username'],
      include: [
        {
          model: this.groupModel,
          attributes: ['id', 'name', 'price'],
        },
      ],
      raw: true,
    });
  }

  async getTeacherGroup(teacherId: number, groupId: number): Promise<Group> {
    const group: Group = await this.groupModel.findByPk(groupId);
    if (!group) {
      throw new HttpException('Not found', 404);
    }
    if (teacherId !== group.teacher_id) {
      throw new HttpException("Sizga tegishli bo'lmagan guruh", 401);
    }
    return group;
  }

  async createGroupLesson(
    GroupLessonData: GroupLessonDto,
  ): Promise<GroupLesson> {
    return (await this.groupLessonModel.create({ ...GroupLessonData })).save();
  }
}

