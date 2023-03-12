import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AudioBook } from '@/audio-book/entities/audio-book.entity';

import { BaseService } from '@base/service/base.service';
import { LoggerService } from '@base/logger';
import * as exc from '@base/api/exception.reslover';
import { PaginateConfig } from 'nestjs-paginate';
import { ListAudioBookDto } from '@/audio-book/dtos/audio-book.dto';
import { AudioBookEp } from '@/audio-book/entities/audio-book-ep.entity';
import { ListAudioBookEpDto } from '@/audio-book/dtos/audio-book-ep.dto';

@Injectable()
export class AudioBookEpService extends BaseService<AudioBookEp> {
  constructor(
    @InjectRepository(AudioBookEp)
    protected readonly repository: Repository<AudioBookEp>,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }
  logger = this.loggerService.getLogger(AudioBookEpService.name);

  async listAudioEpBook(query: ListAudioBookEpDto) {
    const config: PaginateConfig<AudioBookEp> = {
      sortableColumns: ['createdAt'],
    };
    return this.listWithPage(query, config);
  }

  async getAudioBookEp(id: number) {
    const audioBook = await this.repository.findOne({ where: { id: id } });
    if (!audioBook)
      throw new exc.BadException({ message: 'Audio Book không tồn tại' });
    return audioBook;
  }
}
