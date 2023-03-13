import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '@base/logger';
import { EpHistory } from '@/history/entities/ep-history.entity';
import { ListEpHistoryDto, WriteEpHistoryDto } from '@/history/history.dto';
import { PaginateConfig } from 'nestjs-paginate';
import { HistoryService } from '@/history/services/history.service';
import { AudioBookEpService } from '@/audio-book/audio-book-ep.service';
import { History } from '@/history/entities/history.entity';
import { AudioBookEp } from '@/audio-book/entities/audio-book-ep.entity';

@Injectable()
export class EpHistoryService extends BaseService<EpHistory> {
  constructor(
    @InjectRepository(EpHistory)
    protected readonly repository: Repository<EpHistory>,
    private readonly historyService: HistoryService,
    private readonly audioBookEpService: AudioBookEpService,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }

  logger = this.loggerService.getLogger(EpHistoryService.name);

  async listEpHistory(query: ListEpHistoryDto) {
    const config: PaginateConfig<EpHistory> = {
      sortableColumns: ['id'],
      relations: ['audioBookEp'],
    };

    return this.listWithPage(query, config);
  }

  async getEpHistory(historyId: number, audioBookEpId: number) {
    return await this.repository.findOne({
      where: { history: { id: historyId }, audioBookEp: { id: audioBookEpId } },
    });
  }
  async writeEpHistory(dto: WriteEpHistoryDto) {
    const audioBookEp = await this.audioBookEpService.getAudioBookEp(
      dto.audioBookEpId,
    );

    // lấy history
    let history = await this.historyService.getHistory(
      audioBookEp.audioBook.id,
      dto.user.id,
    );

    // nếu không có thì tạo
    if (!history) {
      history = await this.historyService.writeHistory({
        user: dto.user,
        audioBookId: audioBookEp.audioBook.id,
      });
    }

    // lấy ep history
    const epHistory = await this.getEpHistory(history.id, dto.audioBookEpId);

    // nếu có thì cập nhật
    if (epHistory) {
      await this.repository.update(epHistory.id, { duration: dto.duration });
      return { success: true };
    }

    // không có thì tạo mới
    await this.repository.save({
      history: history,
      audioBookEp: audioBookEp,
      duration: 0,
    });
    return { success: true };
  }
}
