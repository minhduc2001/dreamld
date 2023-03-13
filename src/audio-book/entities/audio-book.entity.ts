import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { Genre } from '@/genre/genre.entity';
import { Author } from '@/author/author.entity';
import { AudioBookEp } from '@/audio-book/entities/audio-book-ep.entity';
import { Comment } from '@/comment/comment.entity';
import { History } from '@/history/entities/history.entity';

@Entity()
export class AudioBook extends AbstractEntity {
  @Column()
  title: string;

  @Column({ nullable: true, default: null })
  publicationDate: Date;

  @Column({ nullable: true, default: 0 })
  views: number;

  @Column({ nullable: true, default: 0 })
  likes: number;

  @Column({ nullable: true, default: '' })
  description: string;

  @Column({ type: 'boolean', default: false })
  accomplished: boolean;

  @Column('text', { array: true, default: [], nullable: true })
  images: string[];

  @ManyToMany(() => Genre, (genre) => genre.audioBook)
  @JoinTable()
  genre: Genre[];

  @ManyToMany(() => Author, (author) => author.audioBook)
  @JoinTable()
  author: Author[];

  @OneToMany(() => AudioBookEp, (audioBookEp) => audioBookEp.audioBook)
  @JoinColumn()
  audioBookEps: AudioBookEp[];

  @OneToMany(() => Comment, (comment) => comment.audioBook)
  comment: Comment;

  @OneToMany(() => History, (history) => history.user)
  @JoinColumn()
  history: History[];
}
