import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// BASE
import { LoggerService } from '@base/logger';

// APPS
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { DeviceService } from '@/manager-device/services/device.service';

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
