import { TeacherService } from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto, Roles } from './dto/login.dto';
import { UserDataDto } from './dto/user-data.dto';
import { Student } from '../student/model/student.model';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validate(loginDto: LoginDto): Promise<UserDataDto> {    
    let user: UserDataDto;

    if (loginDto.role === Roles.teacher) {
      const teacher = await this.teacherService.getByCredentials(
        loginDto.username,
        loginDto.password,
      );

      user = {
        role: Roles.teacher,
        id: teacher.id,
      };
    } else if (loginDto.role === Roles.student) {
      const student: Student = await this.studentService.getByCredentials(
        loginDto.username,
        loginDto.password,
      );

      user = {
        role: Roles.student,
        id: student.id,
      };
    } else if (loginDto.role === Roles.parent) {
      const parent = await this.studentService.getParentByCredentials(
        loginDto.username,
        loginDto.password,
      );

      user = {
        role: Roles.parent,
        id: parent.id,
      };
    }

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async generateAccessToken(userData: UserDataDto): Promise<string> {
    return this.jwtService.signAsync(userData);
  }

  getProfileInfo(user: UserDataDto) {
    if (user.role === Roles.teacher) {
      return this.teacherService.getProfile(user.id);
    } else if (user.role === Roles.student || user.role === Roles.parent) {
      return this.studentService.getProfile(user.id);
    } else {
      throw new HttpException('User not found', 404);
    }
  }
}
