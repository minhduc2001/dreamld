import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { User } from '@/user/entities/user.entity';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';
import { EpHistory } from '@/history/entities/ep-history.entity';

@Entity()
export class History extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.history)
  @JoinColumn()
  user: User;

  @ManyToOne(() => AudioBook, (audioBook) => audioBook.history)
  @JoinColumn()
  audioBook: AudioBook;

  @OneToMany(() => EpHistory, (epHistory) => epHistory.history)
  @JoinColumn()
  epHistory: EpHistory[];
}
