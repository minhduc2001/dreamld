import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

// BASE
import { LoggerService } from '@base/logger';
import * as exc from '@base/api/exception.reslover';

import { checkFiles } from '@shared/validator/type-file.validator';

// APPS
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { AudioBookService } from '@/audio-book/audio-book.service';
import {
  CreateAudioBookDto,
  ListAudioBookDto,
} from '@/audio-book/dtos/audio-book.dto';
import { Roles } from '@/role/roles.decorator';
import { ERole } from '@/role/enum/roles.enum';
import { FileService } from '@base/helper/file.service';

@Controller('audio-book')
@ApiTags('Audio Book')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AudioBookController {
  constructor(
    private readonly service: AudioBookService,
    private readonly fileService: FileService,
    private readonly loggerService: LoggerService,
  ) {}

  private logger = this.loggerService.getLogger(AudioBookController.name);

  @ApiOperation({ summary: 'lấy danh sách audio book' })
  @Get()
  async listAudioBook(@Query() query: ListAudioBookDto) {
    return this.service.listAudioBook(query);
  }

  @ApiOperation({ summary: 'Tạo audio book' })
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  @Roles(ERole.Admin)
  async createAudioBook(
    @Body() dto: CreateAudioBookDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      const fileName = checkFiles(files);
      return this.service.createAudioBook({
        ...dto,
        files: fileName,
      });
    } catch (e) {
      this.logger.warn(e.message);
      for (const file of files) {
        this.fileService.removeFile(file.filename);
      }
      throw new exc.BadException({ message: e.message });
    }
  }
}
