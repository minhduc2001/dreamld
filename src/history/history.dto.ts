import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { ListDto } from '@shared/dtos/common.dto';

import { User } from '@/user/entities/user.entity';

export class ListHistoryDto extends ListDto {
  @ApiHideProperty()
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsPositive()
  userId: number;
}

export class ListEpHistoryDto extends ListDto {
  @ApiHideProperty()
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsPositive()
  historyId: number;
}

export class WriteHistoryDto {
  @ApiHideProperty()
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsPositive()
  audioBookId: number;

  @ApiHideProperty()
  @IsOptional()
  user: User;
}

export class WriteEpHistoryDto extends WriteHistoryDto {
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsPositive()
  audioBookEpId: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsPositive()
  duration?: number;
}
