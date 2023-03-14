import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// BASE
import { LoggerService } from '@base/logger';

// APPS
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { AuthorService } from '@/author/author.service';
import { ListAuthorDto } from '@/author/author.dto';

@Controller('author')
@ApiTags('Author')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AuthorController {
  constructor(
    private readonly service: AuthorService,
    private readonly loggerService: LoggerService,
  ) {}

  logger = this.loggerService.getLogger(AuthorController.name);

  @ApiOperation({ summary: 'Lấy danh sách tác giả' })
  @Get()
  async listAuthor(@Query() query: ListAuthorDto) {
    return this.service.listAuthor(query);
  }
}
