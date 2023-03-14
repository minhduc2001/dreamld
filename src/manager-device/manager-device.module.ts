import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// BASE

// APPS
import { DeviceService } from '@/manager-device/services/device.service';
import { DeviceController } from '@/manager-device/controllers/device.controller';
import { Device } from '@/manager-device/entities/device.entity';
import { UserModule } from '@/user/user.module';
import { LoggedDevice } from '@/manager-device/entities/logged-device.entity';
import { LoggedDeviceService } from '@/manager-device/services/logged-device.service';
import { LoggedDeviceController } from '@/manager-device/controllers/logged-device.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Device, LoggedDevice]), UserModule],
  providers: [DeviceService, LoggedDeviceService],
  controllers: [DeviceController, LoggedDeviceController],
  exports: [DeviceService, LoggedDeviceService],
})
export class ManagerDeviceModule {}
