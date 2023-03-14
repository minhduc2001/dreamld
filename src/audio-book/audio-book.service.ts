import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateConfig } from 'nestjs-paginate';

// BASE
import * as exc from '@base/api/exception.reslover';
import { BaseService } from '@base/service/base.service';
import { LoggerService } from '@base/logger';

// APPS
import { ListAudioBookDto } from '@/audio-book/dtos/audio-book.dto';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';

@Injectable()
export class AudioBookService extends BaseService<AudioBook> {
  constructor(
    @InjectRepository(AudioBook)
    protected readonly repository: Repository<AudioBook>,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }
  logger = this.loggerService.getLogger(AudioBookService.name);

  async listAudioBook(query: ListAudioBookDto) {
    const config: PaginateConfig<AudioBook> = {
      sortableColumns: ['updatedAt'],
    };
    return this.listWithPage(query, config);
  }

  async getAudioBook(id: number) {
    const audioBook = await this.repository.findOne({ where: { id: id } });
    if (!audioBook)
      throw new exc.BadRequest({ message: 'Không tồn tại audio book' });
    return audioBook;
  }
}
