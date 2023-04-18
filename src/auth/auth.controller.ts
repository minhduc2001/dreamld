import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { CheckPhoneDto, LoginDto, RegisterDto } from './dtos/auth.dto';
import { ResponseLoginInterceptor } from '@base/api/login.interceptor';
import { RefreshTokenGuard } from '@/auth/guard/jwt-refresh.guard';
import { GetUser } from '@/auth/decorator/get-user.decorator';
import { User } from '@/user/entities/user.entity';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Đăng nhập và hệ thống' })
  @Public()
  @Post('login')
  @UseInterceptors(ResponseLoginInterceptor)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(dto);
    res.cookie('auth-cookie', data.refreshToken, { httpOnly: true });
    return data;
  }

  @ApiOperation({ summary: 'Đăng kí tài khoản' })
  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Kiểm tra số điện thoại có tồn tại chưa' })
  @Public()
  @Get('check-phone/:phone')
  async checkPhoneNumber(@Param() dto: CheckPhoneDto) {
    return this.authService.checkPhoneExist(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'log out' })
  @Get('logout')
  async logout(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('auth-cookie');
    return this.authService.logout(user.id);
  }

  @ApiOperation({ summary: 'refreshToken' })
  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.refreshTokens(
      user.id,
      user.refreshToken,
    );

    res.cookie('auth-cookie', data.refreshToken, { httpOnly: true });
    return { accessToken: data.accessToken };
  }
}
