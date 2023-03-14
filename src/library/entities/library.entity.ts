import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { AudioBookLibrary } from '@/library/entities/audio-book-library.entity';
import { User } from '@/user/entities/user.entity';

@Entity()
export class Library extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(
    () => AudioBookLibrary,
    (audioBookLibrary) => audioBookLibrary.library,
  )
  @JoinColumn()
  audioBookLibrary: AudioBookLibrary[];

  @ManyToOne(() => User, (user) => user.library)
  user: User;
}
