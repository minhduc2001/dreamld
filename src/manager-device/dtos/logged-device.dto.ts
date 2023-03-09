import { ListDto } from '@shared/dtos/common.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Device } from '@/manager-device/entities/device.entity';

export class ListDeviceLoggedDto extends ListDto {}

export class LogoutDeviceDto {
  @ApiProperty()
  @IsNotEmpty()
  device: Device;
}
