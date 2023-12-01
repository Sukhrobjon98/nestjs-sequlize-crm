import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentModule } from '../student/student.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    TeacherModule,
    StudentModule,
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  providers: [LocalAuthGuard, LocalStrategy, AuthService, JwtStrategy],
})
export default class AuthModule {}
