import { Module } from '@nestjs/common';
import { AudioBookController } from './audio-book.controller';
import { AudioBookService } from './audio-book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AudioBook])],
  controllers: [AudioBookController],
  providers: [AudioBookService],
})
export class AudioBookModule {}
