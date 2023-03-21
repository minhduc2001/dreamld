import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserSeed } from '@shared/seeder/user.seed';
import { PermissionSeed } from '@shared/seeder/permission.seed';
import { AuthorSeed } from '@shared/seeder/author.seed';
import { GenreSeed } from '@shared/seeder/genre.seed';
import { AudioBookSeed } from '@shared/seeder/audio-book.seed';
import { AudioBookEpSeed } from '@shared/seeder/audio-book-ep.seed';
import { LibrarySeed } from '@shared/seeder/library.seed';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly userSeed: UserSeed,
    private readonly permissionSeed: PermissionSeed,
    private readonly authorSeed: AuthorSeed,
    private readonly genreSeed: GenreSeed,
    private readonly audioBookSeed: AudioBookSeed,
    private readonly audioBookEpSeed: AudioBookEpSeed,
    private readonly librarySeed: LibrarySeed,
  ) {}

  async onModuleInit() {
    console.info('loading seed ...');
    await this.permissionSeed.seed();
    await this.userSeed.seed();
    await this.authorSeed.seed();
    await this.genreSeed.seed();
    await this.audioBookSeed.seed();
    await this.audioBookEpSeed.seed();
    await this.librarySeed.seed();
    console.info('done!!!!');
  }
}
