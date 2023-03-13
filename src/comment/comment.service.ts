import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { Comment } from '@/comment/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '@base/logger';
import { CreateCommentDto, ListCommentDto } from '@/comment/comment.dto';
import { PaginateConfig } from 'nestjs-paginate';
import { AudioBookEpService } from '@/audio-book/audio-book-ep.service';
import { UserService } from '@/user/user.service';

import * as exc from '@base/api/exception.reslover';
import { AudioBookService } from '@/audio-book/audio-book.service';
import { query } from 'express';

@Injectable()
export class CommentService extends BaseService<Comment> {
  constructor(
    @InjectRepository(Comment)
    protected readonly repository: Repository<Comment>,
    private readonly audioBookEpService: AudioBookEpService,
    private readonly audioBookService: AudioBookService,
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }

  logger = this.loggerService.getLogger(CommentService.name);

  async listComment(query: ListCommentDto) {
    const config: PaginateConfig<Comment> = {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      where: [{ audioBook: { id: query.audioBookId } }],
      relations: ['author', 'reply', 'audioBookEp'],
    };

    return this.listWithPage(query, config);
  }

  async createComment(dto: CreateCommentDto) {
    const audioBook = await this.audioBookService.getAudioBook(dto.audioBook);
    const audioBookEp = await this.audioBookEpService.getAudioBookEp(
      dto.audioBookEp,
    );
    if (audioBookEp.audioBook.id !== audioBook.id)
      throw new exc.BadException({
        message: `Không có ep ${dto.audioBookEp} nào trong audio book ${dto.audioBook}`,
      });

    // get reply user
    let user = null;
    if (dto.reply) {
      user = await this.userService.getUserById(dto.reply);
    }

    return this.repository.save({
      content: dto.content,
      audioBookEp: audioBookEp,
      audioBook: audioBook,
      author: dto.user,
      reply: user,
      parentCommentId: dto.parentCommentId,
    });
  }

  async deleteComment(id: number) {
    return this.repository.delete(id);
  }
}
