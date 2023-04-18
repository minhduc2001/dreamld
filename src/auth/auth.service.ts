import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// BASE
import * as exc from '@base/api/exception.reslover';
import { LoggerService } from '@base/logger';

// APPS
import { UserService } from '@/user/user.service';
import { CheckPhoneDto, LoginDto, RegisterDto } from '@/auth/dtos/auth.dto';
import { IJWTPayload, ITokens } from '@/auth/interfaces/auth.interface';
import { DeviceService } from '@/manager-device/services/device.service';
import { LoggedDeviceService } from '@/manager-device/services/logged-device.service';
import { config } from '@/config';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly deviceService: DeviceService,
    private readonly loggedDeviceService: LoggedDeviceService,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  logger = this.loggerService.getLogger(AuthService.name);

  async login(dto: LoginDto): Promise<any> {
    const { phone, password } = dto;
    const user = await this.userService.getUserByUniqueKey({ phone });
    if (!user || !user.comparePassword(password))
      throw new exc.BadRequest({
        message: 'phone or password does not exists',
      });

    const payload: IJWTPayload = {
      sub: user.id,
      uav: new Date().getTime(),
    };
    const tokens: ITokens = await this.getTokens(payload);

    const device = await this.deviceService.addDevice(dto.deviceInfo);
    try {
      await this.loggedDeviceService.loggedDevice(user, device);
    } catch (e) {
      throw new exc.BadException({
        message: e.message,
        errorCode: e.response.errorCode,
        data: { ...user, accessToken: tokens.accessToken },
      });
    }

    await this.updateRefreshToken(user, tokens.refreshToken);
    return {
      ...user,
      accessToken: tokens.accessToken,
    };
  }

  async register(dto: RegisterDto) {
    const isExists = await this.userService.getUserByUniqueKey({
      phone: dto.phone,
    });

    if (isExists) throw new exc.BadRequest({ message: 'phone already is use' });
    return this.userService.createUser(dto);
  }

  async checkPhoneExist(dto: CheckPhoneDto) {
    return this.userService.checkPhoneNumberExists(dto.phone);
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    // user.setRefreshToken(refreshToken);
    user.refreshToken = refreshToken;
    await this.userService.update(user);
    return;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    console.log(refreshToken);
    const user = await this.userService.getUserById(userId);
    if (!user || !user.refreshToken)
      throw new exc.Forbidden({ message: 'Access Denied' });

    // const refreshTokenMatches = user.compareRefreshToken(refreshToken);
    // if (!refreshTokenMatches)
    //   throw new exc.Forbidden({ message: 'Access Denied' });

    const tokens = await this.getTokens({ sub: userId });
    await this.updateRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  async getTokens(payload: IJWTPayload) {
    console.log(payload, 'payload');
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: config.JWT_RT_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: number) {
    const user = await this.userService.getUser(userId);
    user.refreshToken = '';
    user.uav = new Date().getTime();
    await user.save();
  }
}
