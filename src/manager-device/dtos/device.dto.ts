import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class AddDeviceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value ?? value.trim())
  deviceId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? value.trim())
  deviceName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? value.trim())
  deviceType?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? value.trim())
  osVersion?: string;
}
