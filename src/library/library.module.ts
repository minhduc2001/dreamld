import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// APPS
import { Library } from '@/library/entities/library.entity';
import { AudioBookLibrary } from '@/library/entities/audio-book-library.entity';
import { AudioBookModule } from '@/audio-book/audio-book.module';
import { AudioBookLibraryService } from '@/library/audio-book-library.service';
import { LibraryService } from '@/library/library.service';
import { LibraryController } from '@/library/library.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Library, AudioBookLibrary]),
    AudioBookModule,
  ],
  providers: [LibraryService, AudioBookLibraryService],
  controllers: [LibraryController],
})
export class LibraryModule {}
