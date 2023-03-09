import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { CheckPhoneDto, LoginDto, RegisterDto } from './dtos/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Get('check-phone/:phone')
  async checkPhoneNumber(@Param() dto: CheckPhoneDto) {
    return this.authService.checkPhoneExist(dto);
  }
}
