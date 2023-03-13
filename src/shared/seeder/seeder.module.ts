import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { SeederService } from '@shared/seeder/seeder.service';
import { UserSeed } from '@shared/seeder/user.seed';
import { Permission } from '@/role/entities/permission.entity';
import { PermissionSeed } from '@shared/seeder/permission.seed';
import { Author } from '@/author/author.entity';
import { Genre } from '@/genre/genre.entity';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';
import { AuthorSeed } from '@shared/seeder/author.seed';
import { GenreSeed } from '@shared/seeder/genre.seed';
import { AudioBookSeed } from '@shared/seeder/audio-book.seed';
import { AudioBookEp } from '@/audio-book/entities/audio-book-ep.entity';
import { AudioBookEpSeed } from '@shared/seeder/audio-book-ep.seed';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Permission,
      Author,
      Genre,
      AudioBook,
      AudioBookEp,
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
  ],
})
export class SeedersModule {}
