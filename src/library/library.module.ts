import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// APPS
import { Library } from '@/library/entities/library.entity';
import { AudioBookLibrary } from '@/library/entities/audio-book-library.entity';
import { AudioBookModule } from '@/audio-book/audio-book.module';
import { AudioBookLibraryService } from '@/library/services/audio-book-library.service';
import { LibraryService } from '@/library/services/library.service';
import { LibraryController } from '@/library/library.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Library, AudioBookLibrary]),
    AudioBookModule,
  ],
  providers: [LibraryService, AudioBookLibraryService],
  controllers: [LibraryController],
  exports: [LibraryService],
})
export class LibraryModule {}
