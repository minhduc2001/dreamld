import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { History } from '@/history/entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '@base/logger';
import { PaginateConfig } from 'nestjs-paginate';
import { ListHistoryDto, WriteHistoryDto } from '@/history/history.dto';
import * as exc from '@base/api/exception.reslover';
import { AudioBookService } from '@/audio-book/audio-book.service';

@Injectable()
export class HistoryService extends BaseService<History> {
  constructor(
    @InjectRepository(History)
    protected readonly repository: Repository<History>,
    private readonly audioBookService: AudioBookService,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }

  logger = this.loggerService.getLogger(HistoryService.name);

  async listHistory(query: ListHistoryDto) {
    const config: PaginateConfig<History> = {
      sortableColumns: ['updatedAt'],
      relations: ['audioBook'],
    };
    return this.listWithPage(query, config);
  }

  async writeHistory(dto: WriteHistoryDto) {
    const audioBook = await this.audioBookService.getAudioBook(dto.audioBookId);
    return this.repository.save({
      audioBook: audioBook,
      user: dto.user,
    });
  }

  async getHistory(audioBookId: number, userId: number) {
    return await this.repository.findOne({
      where: { audioBook: { id: audioBookId }, user: { id: userId } },
      relations: { audioBook: true },
    });
  }
}
