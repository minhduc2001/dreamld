import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AudioBookModule } from '@/audio-book/audio-book.module';
import { UserModule } from '@/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@/comment/comment.entity';

@Module({
  imports: [AudioBookModule, UserModule, TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
