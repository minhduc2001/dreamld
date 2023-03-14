import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LibraryService } from '@/library/library.service';
import { LoggerService } from '@base/logger';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import {
  CreateAudioBookLibraryDto,
  CreateLibraryDto,
  ListAudioBookLibraryDto,
  ListLibraryDto,
} from '@/library/library.dto';
import { GetUser } from '@/auth/decorator/get-user.decorator';
import { User } from '@/user/entities/user.entity';
import { AudioBookLibraryService } from '@/library/audio-book-library.service';
import { ParamIdDto } from '@shared/dtos/common.dto';

@Controller('library')
@ApiTags('Library')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LibraryController {
  constructor(
    private readonly service: LibraryService,
    private readonly audioBookLibraryService: AudioBookLibraryService,
    private readonly loggerService: LoggerService,
  ) {}

  logger = this.loggerService.getLogger(LibraryController.name);

  @Get()
  async listLibrary(@Query() query: ListLibraryDto, @GetUser() user: User) {
    return this.service.listLibrary({ ...query, userId: user.id });
  }

  @Get(':id/list')
  async listAudioBookLibrary(
    @Query() query: ListAudioBookLibraryDto,
    @Param() param: ParamIdDto,
  ) {
    return this.audioBookLibraryService.listAudioBookLibrary({
      ...query,
      libraryId: param.id,
    });
  }

  @Post('create-library')
  async createLibrary(@Body() dto: CreateLibraryDto, @GetUser() user: User) {
    return this.service.createLibrary({ ...dto, user: user });
  }

  @Post('create-audio-book-library')
  async createAudioBookLibrary(@Body() dto: CreateAudioBookLibraryDto) {
    return this.audioBookLibraryService.createAudioBookLibrary(dto);
  }
}
