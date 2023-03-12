import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { Comment } from '@/comment/comment.entity';

@Entity()
export class AudioBookEp extends AbstractEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  publicationDate: Date;

  @Column({ nullable: true, default: 0 })
  views: number;

  @OneToMany(() => Comment, (comment) => comment.audioBookEp)
  comment: Comment;
}
