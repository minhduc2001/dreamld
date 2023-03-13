import { ListDto } from '@shared/dtos/common.dto';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isPositive,
  IsPositive,
  IsString,
} from 'class-validator';
import { User } from '@/user/entities/user.entity';
import { Transform } from 'class-transformer';

export class ListCommentDto extends ListDto {
  @ApiHideProperty()
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsPositive()
  audioBookId: number;
}

export class CreateCommentDto {
  @ApiProperty({ description: 'nội dung comment' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'id audio book' })
  @IsNotEmpty()
  @IsPositive()
  audioBook: number;

  @ApiProperty({ description: 'id audio book ep' })
  @IsNotEmpty()
  @IsPositive()
  audioBookEp: number;

  @ApiProperty({ description: 'id comment cha' })
  @IsOptional()
  @IsPositive()
  parentCommentId: number;

  @ApiProperty({ description: 'id người được trả lời' })
  @IsPositive()
  @IsOptional()
  reply: number;

  @ApiHideProperty()
  @IsOptional()
  user: User;
}
