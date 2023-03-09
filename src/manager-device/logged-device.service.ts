import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '@base/logger';
import * as exc from '@base/api/exception.reslover';
import { UserService } from '@/user/user.service';
import { LoggedDevice } from '@/manager-device/entities/logged-device.entity';
import { query } from 'express';
import { PaginateConfig } from 'nestjs-paginate';
import {
  ListDeviceLoggedDto,
  LogoutDeviceDto,
} from '@/manager-device/dtos/logged-device.dto';
import { User } from '@/user/entities/user.entity';
import { Device } from '@/manager-device/entities/device.entity';

@Injectable()
export class LoggedDeviceService extends BaseService<LoggedDevice> {
  constructor(
    @InjectRepository(LoggedDevice)
    protected readonly repository: Repository<LoggedDevice>,
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }
  logger = this.loggerService.getLogger(LoggedDeviceService.name);

  async listDeviceLoggedByUser(query: ListDeviceLoggedDto) {
    const config: PaginateConfig<LoggedDevice> = {
      sortableColumns: ['device.createdAt'],
      relations: ['device'],
    };
    return this.listWithPage(query, config);
  }

  async loggedDevice(user: User, device: Device) {
    const isExists = await this.repository.findOne({
      where: { user: { id: user.id }, device: { id: device.id } },
    });
    if (isExists) return;
    await this.countLimitDevice(user);
    await this.repository.save({ user: user, device: device });
    return;
  }

  async countLimitDevice(user: User) {
    const count = await this.repository.count({
      where: { user: { id: user.id } },
    });
    if (count >= 1)
      throw new exc.BadRequest({
        message: 'Quá giới hạn thiết bị',
        errorCode: 'LIMIT_DEVICE',
      });
    return true;
  }

  // async logoutDevice(userId: number, devices: LogoutDeviceDto[]) {
  //   for (const device of devices) {
  //     await this.repository.delete({ user: { id: userId }, device: {id: device.} });
  //   }
  // }
}
