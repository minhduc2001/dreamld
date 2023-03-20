import {
  FindManyOptions,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { EState } from '@shared/enum/common.enum';
import {
  paginate,
  PaginateConfig,
  PaginateQuery,
} from '@base/service/paginate';

export abstract class BaseService<T> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async listWithPage(
    query: PaginateQuery,
    config: PaginateConfig<T>,
    customQuery?: Repository<T> | SelectQueryBuilder<T>,
  ) {
    if (customQuery) {
      return paginate<T>(query, customQuery, config);
    }
    return paginate<T>(query, this.repository, config);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]> {
    return await this.repository.findAndCount(options);
  }

  async findOne(options?: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOne(options);
  }

  async create(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async update(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
