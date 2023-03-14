import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateConfig } from 'nestjs-paginate';

// BASE
import { BaseService } from '@base/service/base.service';
import { LoggerService } from '@base/logger';
import * as exc from '@base/api/exception.reslover';

// APPS
import { Author } from '@/author/author.entity';
import { ListAuthorDto } from '@/author/author.dto';

@Injectable()
export class AuthorService extends BaseService<Author> {
  constructor(
    @InjectRepository(Author)
    protected readonly repository: Repository<Author>,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }

  private logger = this.loggerService.getLogger(AuthorService.name);

  async listAuthor(query: ListAuthorDto) {
    const config: PaginateConfig<Author> = {
      sortableColumns: ['id'],
    };

    return this.listWithPage(query, config);
  }

  async getAuthor(id: number) {
    const author = await this.repository.findOne({ where: { id: id } });
    if (!author) throw new exc.BadRequest({ message: 'author không tồn tại' });
    return author;
  }
}
