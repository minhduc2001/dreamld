import { Controller, UseGuards } from '@nestjs/common';
import { DeviceService } from '@/manager-device/device.service';
import { LoggerService } from '@base/logger';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';

@Controller('device')
@ApiTags('Device')
@UseGuards(JwtAuthGuard)
export class DeviceController {
  constructor(
    private readonly service: DeviceService,
    private readonly loggerService: LoggerService,
  ) {}

  logger = this.loggerService.getLogger(DeviceController.name);
}
