import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class DeviceInfoDto {
  @ApiProperty({ required: true, example: '982956652' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value && value.trim())
  deviceId: string;

  @ApiProperty({ required: false, example: '' })
  @IsOptional()
  @IsString()
  deviceType: string;

  @ApiProperty({ required: false, example: '' })
  @IsOptional()
  @IsString()
  osVersion: string;

  @ApiProperty({ required: false, example: 'Android' })
  @IsOptional()
  @IsString()
  deviceName: string;
}
export class LoginDto {
  @ApiProperty({ required: true, example: '0768368218' })
  @IsNotEmpty({ message: 'số điện thoại không được để trống' })
  @Transform(({ value }) => value && value.trim())
  @IsString()
  phone: string;

  @ApiProperty({ required: true, example: '123123' })
  @IsNotEmpty({ message: 'USER011101' })
  @IsString()
  password: string;

  @ApiProperty()
  @IsObject()
  deviceInfo: DeviceInfoDto;
}

export class RegisterDto extends OmitType(LoginDto, ['deviceInfo']) {}

export class CheckPhoneDto {
  @ApiProperty({ required: true, example: '0768368218' })
  @IsNotEmpty({ message: 'số điện thoại không được để trống' })
  @Transform(({ value }) => value && value.trim())
  @IsString()
  phone: string;
}
