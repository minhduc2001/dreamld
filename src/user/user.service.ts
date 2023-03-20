import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// BASE
import * as exc from '@/base/api/exception.reslover';
import { LoggerService } from '@base/logger';
import { BaseService } from '@/base/service/base.service';
import { PaginateConfig } from '@base/service/paginate/paginate';

// APPS
import { User } from '@/user/entities/user.entity';
import {
  ICreateUser,
  IUserGetByUniqueKey,
} from '@/user/interfaces/user.interface';
import { ListUserDto, UploadAvatarDto } from '@/user/dtos/user.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }

  logger = this.loggerService.getLogger(UserService.name);

  getUserByUniqueKey(option: IUserGetByUniqueKey): Promise<User> {
    const findOption: Record<string, any>[] = Object.entries(option).map(
      ([key, value]) => ({ [key]: value }),
    );
    return this.repository
      .createQueryBuilder('user')
      .where(findOption)
      .getOne();
  }

  async findOneUser(userId: number): Promise<User | undefined> {
    const user = this.repository.findOne({ where: { id: userId } });
    if (!user)
      throw new exc.BadRequest({ message: 'người dùng không tồn tại' });
    return user;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.repository.findOne({ where: { id: id } });
  }

  async createUser(data: ICreateUser) {
    const user: User = this.repository.create(data);
    user.setPassword(data.password);
    await user.save();
  }

  async getAllUser(query: ListUserDto) {
    const config: PaginateConfig<User> = {
      searchableColumns: ['id'],
      sortableColumns: ['id'],
    };

    return this.listWithPage(query, config);
  }

  async uploadAvatar(dto: UploadAvatarDto) {
    console.log(dto);
  }

  async checkPhoneNumberExists(phone: string) {
    try {
      const isExist = await this.getUserByUniqueKey({ phone: phone });
      if (isExist)
        throw new exc.BadRequest({
          message: 'Số điện thoại đã tồn tại',
          errorCode: 'PHONE_EXIST',
        });
      return;
    } catch (e) {
      // this.logger.warn(e);
      throw new exc.BadRequest({
        message: e.message,
        errorCode: e.response.errorCode,
      });
    }
  }

  async countDeviceLogged(userId) {}
}
