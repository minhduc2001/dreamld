import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// BASE
import { LoggerService } from '@base/logger';

// SHARED
import { ParamIdDto } from '@shared/dtos/common.dto';

// APPS
import { CommentService } from '@/comment/comment.service';
import { CreateCommentDto, ListCommentDto } from '@/comment/comment.dto';
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

  @ApiOperation({ summary: 'Liệt kê comment theo audio book' })
  @Get(':id')
  async listComment(
    @Query() query: ListCommentDto,
    @Param() param: ParamIdDto,
  ) {
    return this.service.listComment({ ...query, audioBookId: param.id });
  }

  @ApiOperation({ summary: 'Tạo comment' })
  @Post()
  async createComment(@Body() dto: CreateCommentDto) {
    return this.service.createComment(dto);
  }

  @ApiOperation({ summary: 'xóa comment' })
  @Delete(':id')
  async deleteComment(@Param() param: ParamIdDto) {
    return this.service.deleteComment(param.id);
  }
}
