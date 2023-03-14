import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateConfig } from 'nestjs-paginate';

// BASE
import { BaseService } from '@base/service/base.service';
import { LoggerService } from '@base/logger';
import * as exc from '@base/api/exception.reslover';

// APPS
import { Genre } from '@/genre/genre.entity';
import { ListGenreDto } from '@/genre/genre.dto';

@Injectable()
export class GenreService extends BaseService<Genre> {
  constructor(
    @InjectRepository(Genre)
    protected readonly repository: Repository<Genre>,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }

  private logger = this.loggerService.getLogger(GenreService.name);

  async listGenre(query: ListGenreDto) {
    const config: PaginateConfig<Genre> = {
      sortableColumns: ['id'],
    };

    return this.listWithPage(query, config);
  }

  async getGenre(id: number) {
    const genre = await this.repository.findOne({ where: { id: id } });
    if (!genre) throw new exc.BadRequest({ message: 'genre không tồn tại' });
    return genre;
  }
}
