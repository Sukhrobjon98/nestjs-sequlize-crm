import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Roles } from './dto/login.dto';

export interface UserData {
  id: number;
  role: Roles;
}
export const User = createParamDecorator(
  (data: any, ctx: ExecutionContext): UserData => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
