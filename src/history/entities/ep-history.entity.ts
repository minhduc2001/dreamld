import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { History } from '@/history/entities/history.entity';
import { AudioBookEp } from '@/audio-book/entities/audio-book-ep.entity';

@Entity()
export class EpHistory extends AbstractEntity {
  @ManyToOne(() => History, (history) => history)
  @JoinColumn()
  history: History;

  @ManyToOne(() => AudioBookEp, (audioBookEp) => audioBookEp.epHistory)
  @JoinColumn()
  audioBookEp: AudioBookEp;

  @Column({ nullable: true, default: 0 })
  duration: number;
}
