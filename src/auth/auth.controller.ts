import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';


@Controller()
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<AuthResponseDto> {
    return {
      accessToken: await this.authService.generateAccessToken(req.user),
      id: req.user.id,
      role: req.user.role,
    };
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.getProfileInfo(req.user);
  }
}
