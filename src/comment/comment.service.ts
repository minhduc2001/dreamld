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

@Injectable()
export class CommentService extends BaseService<Comment> {
  constructor(
    @InjectRepository(Comment)
    protected readonly repository: Repository<Comment>,
    private readonly audioBookEpService: AudioBookEpService,
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
    };

    return this.listWithPage(query, config);
  }

  async createComment(dto: CreateCommentDto) {
    const audioBookEp = await this.audioBookEpService.getAudioBookEp(
      dto.audioBookEp,
    );

    // get reply user
    let user = null;
    if (dto.reply) {
      user = await this.userService.getUserById(dto.reply);
    }

    return this.repository.save({
      content: dto.content,
      audioBookEp: audioBookEp,
      author: dto.user,
      reply: user,
      parentCommentId: dto.parentCommentId,
    });
  }
}
