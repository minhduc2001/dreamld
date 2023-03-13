import { ListDto } from '@shared/dtos/common.dto';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ListAudioBookEpDto extends ListDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value && +value)
  @IsPositive()
  id: number;
}
