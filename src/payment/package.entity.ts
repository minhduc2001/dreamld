import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { EState } from '@shared/enum/common.enum';
import { EPackageExpire } from '@/payment/package.enum';
import { Payment } from '@/payment/payment.entity';

@Entity()
export class Package extends AbstractEntity {
  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: EState,
    default: EState.Active,
  })
  state: EState;

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: EPackageExpire,
    default: EPackageExpire.Daily,
  })
  expire: EPackageExpire;

  @OneToMany(() => Payment, (payment) => payment.package)
  @JoinColumn()
  payments: Payment[];
}
