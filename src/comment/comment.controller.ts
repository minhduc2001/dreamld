import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommentService } from '@/comment/comment.service';
import { LoggerService } from '@base/logger';
import { CreateCommentDto, ListCommentDto } from '@/comment/comment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';

@Controller('comment')
@ApiTags('Comment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(
    private readonly service: CommentService,
    private readonly loggerService: LoggerService,
  ) {}
  logger = this.loggerService.getLogger(CommentController.name);

  @ApiOperation({ summary: 'Liệt kê comment' })
  @Get()
  async listComment(@Query() query: ListCommentDto) {
    return this.service.listComment(query);
  }

  @ApiOperation({ summary: 'Tạo comment' })
  @Post()
  async createComment(@Body() dto: CreateCommentDto) {
    return this.service.createComment(dto);
  }
}
