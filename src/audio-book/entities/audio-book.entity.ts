import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { Genre } from '@/genre/genre.entity';
import { Author } from '@/author/author.entity';

@Entity()
export class AudioBook extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  views: number;

  @Column()
  likes: string;

  @ManyToMany(() => Genre, (genre) => genre.audioBook)
  genre: Genre[];

  @ManyToMany(() => Author, (author) => author.audioBook)
  author: Author[];
}
