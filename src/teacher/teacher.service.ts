import * as bcrypt from 'bcrypt';
import { Teacher } from './model/teacher.model';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher) private readonly teacherModel: typeof Teacher,
  ) {}

  create() {
    return;
  }

  async getByCredentials(username: string, password: string): Promise<Teacher> {
    const teacher: Teacher = await this.teacherModel.findOne({
      where: {
        username: username,
      },

      attributes: ['id', 'password', 'raw_password'],
    });
    if (!teacher) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const hashPass = /^\$2y\$/.test(teacher.password)
      ? '$2a$' + teacher.password.slice(4)
      : teacher.password;

    const isMatch = await bcrypt.compare(password, hashPass);
    if (isMatch) {
      return teacher;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async findAll(): Promise<Teacher[]> {
    return await this.teacherModel.findAll({
      attributes: ['id', 'username', 'name', 'photo', 'phone'],
    });
  }

  async findOne(id: number) {
    const teacher: Teacher = await this.teacherModel.findByPk(id, {
      attributes: [
        'id',
        'username',
        'name',
        'photo',
        'phone',
        'bio',
        'resume',
        'salary_percent',
        'phone2',
      ],
    });
    if (!teacher) {
      throw new HttpException('Teacher no found', 404);
    }
    return teacher;
  }

  async update(id: string, updateData: any) {
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getProfile(id: number): Promise<Teacher> {
    return this.teacherModel.findByPk(id, {
      attributes: ['id', 'username', 'name', 'photo', 'phone'],
    });
  }
}
