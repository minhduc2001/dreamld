import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { Library } from '@/library/entities/library.entity';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';

@Entity()
export class AudioBookLibrary extends AbstractEntity {
  @ManyToOne(() => Library, (library) => library.audioBookLibrary)
  library: Library;

  @ManyToOne(() => AudioBook, (audioBook) => audioBook.audioBookLibrary)
  @JoinColumn()
  audioBook: AudioBook;
}
