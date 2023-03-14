import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from '@/library/entities/library.entity';
import { AudioBookLibrary } from '@/library/entities/audio-book-library.entity';
import { AudioBookModule } from '@/audio-book/audio-book.module';
import { AudioBookLibraryService } from '@/library/audio-book-library.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Library, AudioBookLibrary]),
    AudioBookModule,
  ],
  providers: [LibraryService, AudioBookLibraryService],
  controllers: [LibraryController],
})
export class LibraryModule {}
