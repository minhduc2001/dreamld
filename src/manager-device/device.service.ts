import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// BASE
import { BaseService } from '@base/service/base.service';
import { LoggerService } from '@base/logger';
import * as exc from '@base/api/exception.reslover';

// APPS
import { Device } from '@/manager-device/entities/device.entity';
import { AddDeviceDto } from '@/manager-device/dtos/device.dto';
import { UserService } from '@/user/user.service';
import { LoggedDeviceService } from '@/manager-device/logged-device.service';

@Injectable()
export class DeviceService extends BaseService<Device> {
  constructor(
    @InjectRepository(Device)
    protected readonly repository: Repository<Device>,
    private readonly userService: UserService,
    private readonly loggedDeviceService: LoggedDeviceService,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }
  logger = this.loggerService.getLogger(DeviceService.name);

  async addDevice(dto: AddDeviceDto) {
    const check = await this.checkDeviceExist(dto.deviceId);
    if (check) return check;
    return await this.repository.save(dto);
  }
  async checkDeviceExist(deviceId: string) {
    try {
      const isExists = await this.findOne({ where: { deviceId } });
      if (isExists) return isExists;
      return false;
    } catch (e) {
      this.logger.warn(e);
      throw new exc.BadRequest({ message: e.message });
    }
  }
}
