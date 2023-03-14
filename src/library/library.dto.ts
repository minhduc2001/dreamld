import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { User } from '@/user/entities/user.entity';

import { ListDto } from '@shared/dtos/common.dto';

export class ListLibraryDto extends ListDto {
  @ApiHideProperty()
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsPositive()
  userId?: number;
}

export class ListAudioBookLibraryDto extends ListDto {
  @ApiHideProperty()
  @Transform(({ value }) => value && +value)
  @IsOptional()
  @IsPositive()
  libraryId?: number;
}

export class CreateLibraryDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value && value.trim())
  @IsString()
  name: string;

  @ApiHideProperty()
  @IsOptional()
  user?: User;
}

export class CreateAudioBookLibraryDto {
  @ApiProperty()
  @Transform(({ value }) => value && +value)
  @IsNotEmpty()
  @IsPositive()
  libraryId: number;

  @ApiProperty()
  @Transform(({ value }) => value && +value)
  @IsNotEmpty()
  @IsPositive()
  audioBookId: number;
}
