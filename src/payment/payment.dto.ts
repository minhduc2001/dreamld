import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ToNumber } from '@base/decorators/common.decorator';
import { User } from '@/user/entities/user.entity';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @ToNumber()
  @IsPositive()
  packageId: number;

  @ApiHideProperty()
  @IsOptional()
  user: User;
}
