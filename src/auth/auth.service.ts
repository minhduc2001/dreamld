import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// BASE
import * as exc from '@base/api/exception.reslover';
import { LoggerService } from '@base/logger';

// APPS
import { UserService } from '@/user/user.service';
import { CheckPhoneDto, LoginDto, RegisterDto } from '@/auth/dtos/auth.dto';
import { IJWTPayload } from '@/auth/interfaces/auth.interface';
import { DeviceService } from '@/manager-device/services/device.service';
import { LoggedDeviceService } from '@/manager-device/services/logged-device.service';

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
      // uav: new Date().getTime(),
    };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload);

    const device = await this.deviceService.addDevice(dto.deviceInfo);
    try {
      await this.loggedDeviceService.loggedDevice(user, device);
    } catch (e) {
      throw new exc.BadException({
        message: e.message,
        errorCode: e.response.errorCode,
        data: { ...user, accessToken: accessToken, refreshToken: refreshToken },
      });
    }

    delete user.password;
    return {
      ...user,
      accessToken: accessToken,
      refreshToken: refreshToken,
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
}
