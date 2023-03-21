import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/user/entities/user.entity';
import { Permission } from '@/role/entities/permission.entity';
import { Author } from '@/author/author.entity';
import { Genre } from '@/genre/genre.entity';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';
import { AudioBookEp } from '@/audio-book/entities/audio-book-ep.entity';

import { SeederService } from '@shared/seeder/seeder.service';
import { UserSeed } from '@shared/seeder/user.seed';
import { PermissionSeed } from '@shared/seeder/permission.seed';
import { AuthorSeed } from '@shared/seeder/author.seed';
import { GenreSeed } from '@shared/seeder/genre.seed';
import { AudioBookSeed } from '@shared/seeder/audio-book.seed';
import { AudioBookEpSeed } from '@shared/seeder/audio-book-ep.seed';
import { Library } from '@/library/entities/library.entity';
import { LibrarySeed } from '@shared/seeder/library.seed';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Permission,
      Author,
      Genre,
      AudioBook,
      AudioBookEp,
      Library,
    ]),
  ],
  providers: [
    SeederService,
    UserSeed,
    PermissionSeed,
    AuthorSeed,
    GenreSeed,
    AudioBookSeed,
    AudioBookEpSeed,
    LibrarySeed,
  ],
})
export class SeedersModule {}
