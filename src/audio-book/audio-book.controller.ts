import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { AudioBookService } from '@/audio-book/audio-book.service';
import { LoggerService } from '@base/logger';
import { ListAudioBookDto } from '@/audio-book/dtos/audio-book.dto';

@Controller('audio-book')
@ApiTags('Audio Book')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AudioBookController {
  constructor(
    private readonly service: AudioBookService,
    private readonly loggerService: LoggerService,
  ) {}

  @ApiOperation({ summary: 'lấy danh sách audio book' })
  @Get()
  async listAudioBook(@Query() query: ListAudioBookDto) {
    return this.service.listAudioBook(query);
  }
}
