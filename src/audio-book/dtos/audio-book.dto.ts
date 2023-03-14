import { ListDto } from '@shared/dtos/common.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ToNumbers, Trim } from '@base/decorators/common.decorator';

export class ListAudioBookDto extends ListDto {}

export class CreateAudioBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @Trim()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  publicationDate: Date;

  @ApiProperty({ required: false })
  @IsString()
  @Trim()
  @IsOptional()
  description: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  accomplished: boolean;

  @ApiProperty({ required: false })
  @IsArray()
  @ToNumbers()
  @IsOptional()
  @IsPositive({ each: true })
  genre: number[];

  @ApiProperty({ required: false })
  @IsArray()
  @ToNumbers()
  @IsOptional()
  @IsPositive({ each: true })
  author: number[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
    required: false,
    isArray: true,
  })
  @IsOptional()
  files: string[];
}
