import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';

@Entity()
export class Author extends AbstractEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => AudioBook, (audioBook) => audioBook.author)
  audioBook: AudioBook[];
}
