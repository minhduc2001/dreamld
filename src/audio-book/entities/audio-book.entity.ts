import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { Genre } from '@/genre/genre.entity';
import { Author } from '@/author/author.entity';

@Entity()
export class AudioBook extends AbstractEntity {
  @Column()
  title: string;

  @Column({ nullable: true, default: null })
  publicationDate: Date;

  @Column()
  views: number;

  @Column()
  likes: string;

  @Column({ type: 'boolean', default: false })
  accomplished: boolean;

  @ManyToMany(() => Genre, (genre) => genre.audioBook)
  @JoinTable()
  genre: Genre[];

  @ManyToMany(() => Author, (author) => author.audioBook)
  @JoinTable()
  author: Author[];
}
