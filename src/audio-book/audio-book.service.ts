import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// BASE
import * as exc from '@base/api/exception.reslover';
import { BaseService } from '@base/service/base.service';
import { LoggerService } from '@base/logger';
import { PaginateConfig } from '@base/service/paginate';

// APPS
import {
  CreateAudioBookDto,
  ListAudioBookDto,
} from '@/audio-book/dtos/audio-book.dto';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';
import { AuthorService } from '@/author/author.service';
import { GenreService } from '@/genre/genre.service';

@Injectable()
export class AudioBookService extends BaseService<AudioBook> {
  constructor(
    @InjectRepository(AudioBook)
    protected readonly repository: Repository<AudioBook>,
    private readonly authorService: AuthorService,
    private readonly genreService: GenreService,
    private readonly loggerService: LoggerService,
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
