import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { Comment } from '@/comment/comment.entity';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';
import { EpHistory } from '@/history/entities/ep-history.entity';

@Entity()
export class AudioBookEp extends AbstractEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  publicationDate: Date;

  @Column('text', { array: true, default: [], nullable: true })
  images: string[];

  @Column({ nullable: true, default: '' })
  url: string;

  @Column({ nullable: true, default: 0 })
  views: number;

  @ManyToOne(() => AudioBook, (audioBook) => audioBook.audioBookEps)
  audioBook: AudioBook;

  @OneToMany(() => Comment, (comment) => comment.audioBookEp)
  comment: Comment;

  @OneToMany(() => EpHistory, (epHistory) => epHistory.audioBookEp)
  epHistory: EpHistory[];
}
