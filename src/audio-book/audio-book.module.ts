import { Module } from '@nestjs/common';
import { AudioBookController } from './audio-book.controller';
import { AudioBookService } from './audio-book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';
import { AudioBookEp } from '@/audio-book/entities/audio-book-ep.entity';
import { AudioBookEpService } from '@/audio-book/audio-book-ep.service';

@Module({
  imports: [TypeOrmModule.forFeature([AudioBook, AudioBookEp])],
  controllers: [AudioBookController],
  providers: [AudioBookService, AudioBookEpService],
  exports: [AudioBookEpService],
})
export class AudioBookModule {}
