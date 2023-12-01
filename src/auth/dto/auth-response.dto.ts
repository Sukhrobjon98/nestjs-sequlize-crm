import { Roles } from './login.dto';

export class AuthResponseDto {
  accessToken: string;

  id: number;

  role: Roles;
}
