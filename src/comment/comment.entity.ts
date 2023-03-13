import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { Genre } from '@/genre/genre.entity';
import { Author } from '@/author/author.entity';
import { User } from '@/user/entities/user.entity';
import { AudioBookEp } from '@/audio-book/entities/audio-book-ep.entity';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';

@Entity()
export class Comment extends AbstractEntity {
  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true, default: 0 })
  likes: string;

  @Column({ nullable: true, default: null })
  parentCommentId: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  reply: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  author: User;

  @ManyToOne(() => AudioBook, (audioBook) => audioBook.comment)
  @JoinColumn()
  audioBook: AudioBook;

  @ManyToOne(() => AudioBookEp, (audioBookEp) => audioBookEp.comment)
  @JoinColumn()
  audioBookEp: AudioBookEp;
}
