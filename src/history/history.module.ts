import { Module } from '@nestjs/common';
import { HistoryService } from './services/history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from '@/history/entities/history.entity';
import { EpHistory } from '@/history/entities/ep-history.entity';
import { EpHistoryService } from '@/history/services/ep-history.service';
import { AudioBookModule } from '@/audio-book/audio-book.module';

@Module({
  imports: [TypeOrmModule.forFeature([History, EpHistory]), AudioBookModule],
  providers: [HistoryService, EpHistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
