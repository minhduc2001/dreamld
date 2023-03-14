import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// BASE
import { LoggerService } from '@base/logger';

// APPS
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { GenreService } from '@/genre/genre.service';
import { ListGenreDto } from '@/genre/genre.dto';

@Controller('genre')
@ApiTags('Genre')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GenreController {
  constructor(
    private readonly service: GenreService,
    private readonly loggerService: LoggerService,
  ) {}

  logger = this.loggerService.getLogger(GenreController.name);

  @ApiOperation({ summary: 'Lấy danh sách thể loại' })
  @Get()
  async listGenre(@Query() query: ListGenreDto) {
    return this.service.listGenre(query);
  }
}
