import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

// BASE
import * as exc from '@base/api/exception.reslover';
import { BaseService } from '@base/service/base.service';
import { LoggerService } from '@base/logger';
import { PaginateConfig } from '@base/service/paginate';

// APPS
import {
  CreateAudioBookDto,
  ListAudioBookDto,
  UpdateAudioBookDto,
} from '@/audio-book/dtos/audio-book.dto';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';
import { AuthorService } from '@/author/author.service';
import { GenreService } from '@/genre/genre.service';
import { User } from '@/user/entities/user.entity';
import { Library } from '@/library/entities/library.entity';
import { AudioBookLibrary } from '@/library/entities/audio-book-library.entity';

@Injectable()
export class AudioBookService extends BaseService<AudioBook> {
  constructor(
    @InjectRepository(AudioBook)
    protected readonly repository: Repository<AudioBook>,
    private readonly authorService: AuthorService,
    private readonly genreService: GenreService,
    private readonly loggerService: LoggerService,
    private dataSource: DataSource,
  ) {
    super(repository);
  }
  logger = this.loggerService.getLogger(AudioBookService.name);

  async listAudioBook(query: ListAudioBookDto) {
    const config: PaginateConfig<AudioBook> = {
      sortableColumns: ['updatedAt'],
      relations: ['author', 'genre'],
    };
    return this.listWithPage(query, config);
  }

  async getAudioBook(id: number) {
    const audioBook = await this.repository.findOne({ where: { id: id } });
    if (!audioBook)
      throw new exc.BadRequest({ message: 'Không tồn tại audio book' });
    return audioBook;
  }

  async createAudioBook(dto: CreateAudioBookDto) {
    try {
      const authors = await this._findAuthor(dto.author);
      const genres = await this._findGenre(dto.genre);

      return await this.repository.save({
        author: authors,
        genre: genres,
        title: dto.title,
        accomplished: dto.accomplished,
        description: dto.description,
        publicationDate: dto.publicationDate,
        images: dto.files,
      });
    } catch (e) {
      this.logger.warn(e);
      throw new exc.BadException({ message: e.message });
    }
  }

  async updateAudioBook(dto: UpdateAudioBookDto) {
    const audioBook = await this.getAudioBook(dto.id);

    const authors = await this._findAuthor(dto.author);
    const genres = await this._findGenre(dto.genre);

    if (dto.title) {
      audioBook.title = dto.title;
    }

    audioBook.author = authors;
    audioBook.genre = genres;
    await audioBook.save();

    await this.repository.update(dto.id, {
      accomplished: dto.accomplished,
      description: dto.description,
      publicationDate: dto.publicationDate,
      images: dto.files,
    });
    return true;
  }

  async like(id: number, user?: User) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const check = await queryRunner.manager.findOne(AudioBookLibrary, {
        where: {
          audioBook: { id: id },
          library: { name: 'Yêu thích', user: { id: user.id } },
        },
      });

      const audioBook = await queryRunner.manager.findOne(AudioBook, {
        where: { id: id },
      });

      if (check) {
        audioBook.likes -= 1;
        await queryRunner.manager.delete(AudioBookLibrary, check.id);
      } else {
        audioBook.likes += 1;
        const audioBookLib = new AudioBookLibrary();
        const lib = await queryRunner.manager.findOne(Library, {
          where: { name: 'Yêu thích', user: { id: user.id } },
        });

        audioBookLib.audioBook = audioBook;
        audioBookLib.library = lib;

        await queryRunner.manager.save(audioBookLib);
      }

      await queryRunner.manager.save(audioBook);
      await queryRunner.commitTransaction();
      return true;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new exc.BadRequest({ message: e.message });
    } finally {
      await queryRunner.release();
    }
  }

  async follow(id: number, user?: User) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const check = await queryRunner.manager.findOne(AudioBookLibrary, {
        where: {
          audioBook: { id: id },
          library: { name: 'Theo dõi', user: { id: user.id } },
        },
      });

      const audioBook = await queryRunner.manager.findOne(AudioBook, {
        where: { id: id },
      });

      if (check) {
        audioBook.followers -= 1;
        await queryRunner.manager.delete(AudioBookLibrary, check.id);
      } else {
        audioBook.followers += 1;
        const audioBookLib = new AudioBookLibrary();
        const lib = await queryRunner.manager.findOne(Library, {
          where: { name: 'Theo dõi', user: { id: user.id } },
        });

        audioBookLib.audioBook = audioBook;
        audioBookLib.library = lib;

        await queryRunner.manager.save(audioBookLib);
      }

      await queryRunner.manager.save(audioBook);
      await queryRunner.commitTransaction();
      return true;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new exc.BadRequest({ message: e.message });
    } finally {
      await queryRunner.release();
    }
  }

  // Private func

  private async _findAuthor(author_ids: number[]) {
    if (!author_ids) return;
    const data = [];
    for (const id of author_ids) {
      const author = await this.authorService.getAuthor(id);
      data.push(author);
    }
    return data;
  }

  private async _findGenre(genre_ids: number[]) {
    if (!genre_ids) return;
    const data = [];
    for (const id of genre_ids) {
      const genre = await this.genreService.getGenre(id);
      data.push(genre);
    }
    return data;
  }
}
