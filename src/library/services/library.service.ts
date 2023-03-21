import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// BASE
import { BaseService } from '@base/service/base.service';
import { LoggerService } from '@base/logger';
import * as exc from '@base/api/exception.reslover';
import { PaginateConfig } from '@base/service/paginate';

// APPS
import { Library } from '@/library/entities/library.entity';
import {
  CreateLibraryDto,
  ListLibraryDto,
  UpdateLibrary,
} from '@/library/library.dto';

@Injectable()
export class LibraryService extends BaseService<Library> {
  constructor(
    @InjectRepository(Library)
    protected readonly repository: Repository<Library>,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }

  logger = this.loggerService.getLogger(LibraryService.name);

  async listLibrary(query: ListLibraryDto) {
    const config: PaginateConfig<Library> = {
      sortableColumns: ['updatedAt'],
      defaultSortBy: [['updatedAt', 'DESC']],
      where: [{ user: { id: query.userId } }],
    };

    return this.listWithPage(query, config);
  }

  async createLibrary(dto: CreateLibraryDto) {
    const library = await this.repository
      .createQueryBuilder('library')
      .where('unaccent(library.name) ILIKE unaccent(:name)', {
        name: dto.name,
      })
      .andWhere(`library.user = :userId`, { userId: dto.user.id })
      .getOne();

    if (library) throw new exc.BadException({ message: 'thư viện đã tồn tại' });
    return this.repository.save({
      user: dto.user,
      name: dto.name,
    });
  }

  async getLibrary(id: number) {
    const library = await this.repository.findOne({ where: { id: id } });
    if (!library) throw new exc.NotFound({ message: 'Không tồn tại thư viện' });
    return library;
  }

  async deleteLibrary(id: number) {
    return this.repository.delete(id);
  }

  async updateLibrary(dto: UpdateLibrary) {
    await this.getLibrary(dto.id);
    await this.repository.update(dto.id, { name: dto.name });
    return true;
  }
}
