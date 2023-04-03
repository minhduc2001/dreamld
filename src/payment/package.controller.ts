import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/auth/decorator/public.decorator';
import { PackageService } from '@/payment/package.service';
import {
  CreatePackageDto,
  ListPackageDto,
  UpdatePackageDto,
} from '@/payment/package.dto';
import { Roles } from '@/role/roles.decorator';
import { ERole } from '@/role/enum/roles.enum';
import { BulkIdsDto, ParamIdDto } from '@shared/dtos/common.dto';

@ApiTags('Package')
@Controller('package')
export class PackageController {
  constructor(private readonly service: PackageService) {}

  @Public()
  // @Roles(ERole.Admin)
  @Post()
  async createPackage(@Body() dto: CreatePackageDto) {
    return this.service.createPackage(dto);
  }

  @Get()
  async listPackage(@Query() query: ListPackageDto) {
    return this.service.listPackage(query);
  }

  @Put(':id')
  async updatePackage(
    @Param() param: ParamIdDto,
    @Body() dto: UpdatePackageDto,
  ) {
    return this.service.updatePackage({ ...param, ...dto });
  }

  @Delete()
  async bulkDeletePackage(@Body() dto: BulkIdsDto) {
    return this.service.bulkDeletePackage(dto.ids);
  }
}
