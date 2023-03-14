import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// BASE
import { LoggerService } from '@base/logger';

//APPS
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { LoggedDeviceService } from '@/manager-device/logged-device.service';
import { GetUser } from '@/auth/decorator/get-user.decorator';
import { User } from '@/user/entities/user.entity';

@Controller('logged-device')
@ApiTags('Device')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LoggedDeviceController {
  constructor(
    private readonly service: LoggedDeviceService,
    private readonly loggerService: LoggerService,
  ) {}

  logger = this.loggerService.getLogger(LoggedDeviceController.name);

  @Get()
  async listDeviceLoggedByUser(@GetUser() user: User) {
    return this.service.listDeviceLoggedByUser(user);
  }

  @Post('logout-device')
  async logoutDevice(@GetUser() user: User, @Body() dto: any) {
    // TODO: logout device
    console.log(dto);
    // return this.service.logoutDevice(user.id, dto);
    return;
  }
}
