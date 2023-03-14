import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// BASE

// APPS
import { DeviceService } from '@/manager-device/device.service';
import { DeviceController } from '@/manager-device/device.controller';
import { Device } from '@/manager-device/entities/device.entity';
import { UserModule } from '@/user/user.module';
import { LoggedDevice } from '@/manager-device/entities/logged-device.entity';
import { LoggedDeviceService } from '@/manager-device/logged-device.service';
import { LoggedDeviceController } from '@/manager-device/logged-device.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Device, LoggedDevice]), UserModule],
  providers: [DeviceService, LoggedDeviceService],
  controllers: [DeviceController, LoggedDeviceController],
  exports: [DeviceService, LoggedDeviceService],
})
export class ManagerDeviceModule {}
