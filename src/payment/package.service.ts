import { Injectable } from '@nestjs/common';
import { LoggerService } from '@base/logger';
import { BaseService } from '@base/service/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from '@base/redis/redis.service';
import * as exc from '@base/api/exception.reslover';
import { MomoPaymentService } from '@base/other/payment/momo-payment.service';
import { Package } from '@/payment/package.entity';
import { PaginateConfig } from '@base/service/paginate';
import {
  CreatePackageDto,
  ListPackageDto,
  UpdatePackageDto,
} from '@/payment/package.dto';

@Injectable()
export class PackageService extends BaseService<Package> {
  constructor(
    @InjectRepository(Package)
    protected readonly repository: Repository<Package>,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }
  private logger = this.loggerService.getLogger(PackageService.name);

  async getPackage(id: number) {
    const isExist = await this.repository.findOne({ where: { id: id } });
    if (!isExist) throw new exc.BadException({ message: 'Gói không tồn tại' });
    return isExist;
  }

  async listPackage(query: ListPackageDto) {
    const config: PaginateConfig<Package> = {
      sortableColumns: ['createdAt', 'expire'],
    };
    return this.listWithPage(query, config);
  }

  async createPackage(dto: CreatePackageDto) {
    return this.repository.save(dto);
  }

  async updatePackage(dto: UpdatePackageDto) {
    return this.repository.update(dto.id, dto);
  }

  async bulkDeletePackage(ids: number[]) {
    try {
      for (const id of ids) {
        await this._checkDependency(id);
        await this.repository.delete(id);
      }
    } catch (e) {
      this.logger.warn(e);
      throw new exc.BadException({ message: e.message });
    }
  }

  // Private

  private async _checkDependency(id: number) {
    return;
  }
}
