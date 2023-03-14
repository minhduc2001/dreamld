import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateConfig } from 'nestjs-paginate';

// BASE
import { BaseService } from '@base/service/base.service';
import { LoggerService } from '@base/logger';
import * as exc from '@base/api/exception.reslover';

// APPS
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

  async listAudioBookEp(query: ListAudioBookEpDto) {
    const config: PaginateConfig<AudioBookEp> = {
      sortableColumns: ['createdAt'],
      where: [{ audioBook: { id: query.id } }],
      relations: ['audioBook'],
    };

    return this.listWithPage(query, config);
  }

  async getAudioBookEp(id: number) {
    const audioBook = await this.repository.findOne({
      where: { id: id },
      relations: { audioBook: true },
    });
    if (!audioBook)
      throw new exc.BadException({ message: 'Audio Book không tồn tại' });
    return audioBook;
  }
}
