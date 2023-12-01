import { IsNotEmpty, IsString } from 'class-validator';

export enum Roles {
  teacher = 'TEACHER',
  student = 'STUDENT',
  parent = 'PARENT',
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  password?: string;

  @IsString()
  role: Roles;
}
