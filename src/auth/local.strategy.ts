import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UserDataDto } from './dto/user-data.dto';
import { Roles } from './dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true });
  }

  async validate(
    request: Request<
      any,
      any,
      { username: string; password: string; role: Roles }
    >,
    username: string,
    password: string,
  ): Promise<UserDataDto> {
    const user: UserDataDto = await this.authService.validate({
      username,
      password,
      role: request.body.role,
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
