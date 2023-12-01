import * as bcrypt from 'bcrypt';
import { Student } from './model/student.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private readonly studentModel: typeof Student,
  ) {}

  create() {
    return;
  }

  async getByCredentials(id: string, password: string): Promise<Student> {
    const student = await this.studentModel.findByPk(id, {
      attributes: ['id', 'password'],
    });

    if (!student) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const hashPass = /^\$2y\$/.test(student.password)
      ? '$2a$' + student.password.slice(4)
      : student.password;
    const isMatch = await bcrypt.compare(password, hashPass);
    if (isMatch) {
      return student;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async getParentByCredentials(id: string, password: string): Promise<Student> {
    const student = await this.studentModel.findByPk(id, {
      attributes: ['id', 'parent_password'],
    });
    if (!student) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const hashPass = /^\$2y\$/.test(student.parent_password)
      ? '$2a$' + student.parent_password.slice(4)
      : student.parent_password;
    const isMatch = await bcrypt.compare(password, hashPass);
    if (isMatch) {
      return student;
    }
    throw new UnauthorizedException();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.studentModel.findByPk(id, {
      attributes: [
        'name',
        'phone',
        'birth_date',
        'number',
        'parent_name',
        'parent_phone',
      ],
    });
  }

  async update(id: string, updateData: any) {
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getProfile(id: number): Promise<Student> {
    return this.studentModel.findByPk(id, {
      attributes: [
        'id',
        'name',
        'phone',
        'birth_date',
        'number',
        'parent_name',
        'parent_phone',
      ],
    });
  }
}
