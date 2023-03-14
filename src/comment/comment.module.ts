import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentService } from '@/comment/comment.service';
import { CommentController } from '@/comment/comment.controller';
import { AudioBookModule } from '@/audio-book/audio-book.module';
import { UserModule } from '@/user/user.module';
import { Comment } from '@/comment/comment.entity';

@Module({
  imports: [AudioBookModule, UserModule, TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
