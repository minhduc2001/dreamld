import { Module } from '@nestjs/common';
import { AudioBookController } from './audio-book.controller';
import { AudioBookService } from './audio-book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';
import { AudioBookEp } from '@/audio-book/entities/audio-book-ep.entity';
import { AudioBookEpService } from '@/audio-book/audio-book-ep.service';
import { AudioBookEpController } from '@/audio-book/audio-book-ep.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AudioBook, AudioBookEp])],
  controllers: [AudioBookController, AudioBookEpController],
  providers: [AudioBookService, AudioBookEpService],
  exports: [AudioBookEpService, AudioBookService],
})
export class AudioBookModule {}
