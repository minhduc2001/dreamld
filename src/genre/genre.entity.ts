import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';

@Entity()
export class Genre extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => AudioBook, (audioBook) => audioBook.genre)
  audioBook: AudioBook[];
}
