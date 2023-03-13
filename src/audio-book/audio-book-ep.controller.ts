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
import { AudioBookEpService } from '@/audio-book/audio-book-ep.service';
import { ListAudioBookEpDto } from '@/audio-book/dtos/audio-book-ep.dto';

@Controller('audio-book')
@ApiTags('Audio Book')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AudioBookEpController {
  constructor(
    private readonly service: AudioBookEpService,
    private readonly loggerService: LoggerService,
  ) {}

  @ApiOperation({ summary: 'lấy danh sách các tập audio book' })
  @Get(':id/ep')
  async listAudioBookEp(@Query() query: ListAudioBookEpDto) {
    return this.service.listAudioBookEp(query);
  }
}
