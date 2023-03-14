import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateConfig } from 'nestjs-paginate';

// BASE
import { LoggerService } from '@base/logger';
import * as exc from '@base/api/exception.reslover';
import { BaseService } from '@base/service/base.service';

// APPS
import {
  CreateAudioBookLibraryDto,
  ListAudioBookLibraryDto,
} from '@/library/library.dto';
import { AudioBookLibrary } from '@/library/entities/audio-book-library.entity';
import { AudioBookService } from '@/audio-book/audio-book.service';
import { LibraryService } from '@/library/library.service';

@Injectable()
export class AudioBookLibraryService extends BaseService<AudioBookLibrary> {
  constructor(
    @InjectRepository(AudioBookLibrary)
    protected readonly repository: Repository<AudioBookLibrary>,
    private readonly audioBookService: AudioBookService,
    private readonly libraryService: LibraryService,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }

  logger = this.loggerService.getLogger(AudioBookLibraryService.name);

  async listAudioBookLibrary(query: ListAudioBookLibraryDto) {
    const config: PaginateConfig<AudioBookLibrary> = {
      sortableColumns: ['updatedAt'],
      defaultSortBy: [['updatedAt', 'DESC']],
      relations: ['audioBook'],
    };

    return this.listWithPage(query, config);
  }

  async createAudioBookLibrary(dto: CreateAudioBookLibraryDto) {
    const library = await this.libraryService.getLibrary(dto.libraryId);
    const audioBook = await this.audioBookService.getAudioBook(dto.audioBookId);
    return this.repository.save({
      library: library,
      audioBook: audioBook,
    });
  }
}
