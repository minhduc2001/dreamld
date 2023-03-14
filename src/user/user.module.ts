import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '@/user/user.service';
import { UserController } from '@/user/user.controller';
import { User } from '@/user/entities/user.entity';

import { UploadFileModule } from '@base/multer/upload-file.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UploadFileModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
