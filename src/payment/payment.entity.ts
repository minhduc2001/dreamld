import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { EMethodPayment, EStatePayment } from '@/payment/payment.enum';
import { User } from '@/user/entities/user.entity';
import { Package } from '@/payment/package.entity';

@Entity()
export class Payment extends AbstractEntity {
  @Column()
  amount: number;

  @Column({
    enum: EMethodPayment,
    default: null,
    type: 'enum',
  })
  paymentMethod: EMethodPayment;

  @Column({
    type: 'enum',
    enum: EStatePayment,
    default: EStatePayment.Pending,
  })
  state: EStatePayment;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @ManyToOne(() => Package, (pack) => pack.payments)
  package: Package;
}
