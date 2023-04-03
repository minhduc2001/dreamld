import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { JoinTable } from 'typeorm';

import { AbstractEntity } from '@base/service/abstract-entity.service';

import { ERole } from '@/role/enum/roles.enum';
import { Permission } from '@/role/entities/permission.entity';
import { LoggedDevice } from '@/manager-device/entities/logged-device.entity';
import { History } from '@/history/entities/history.entity';
import { Library } from '@/library/entities/library.entity';

import { EState } from '@shared/enum/common.enum';
import { Payment } from '@/payment/payment.entity';
@Entity()
export class User extends AbstractEntity {
  @Column({ nullable: true })
  username: string;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  background: string;

  @Column({ nullable: false, type: 'enum', enum: ERole, default: ERole.Guest })
  role: ERole;

  @ManyToMany(() => Permission, (permission) => permission)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => LoggedDevice, (loggedDevice) => loggedDevice.user)
  @JoinColumn()
  loggedDevice: LoggedDevice[];

  @OneToMany(() => History, (history) => history.user)
  @JoinColumn()
  history: History[];

  @OneToMany(() => Library, (library) => library.user)
  @JoinColumn()
  library: Library[];

  @OneToMany(() => Payment, (payment) => payment.user)
  @JoinColumn()
  payments: Payment[];

  @Column({ nullable: true, default: null })
  packageId: number;

  @Column({ type: 'bigint', nullable: true, default: null })
  packageExpire: string;

  @Column({ type: 'enum', enum: EState, default: EState.Active })
  state: EState;

  setPassword(password: string) {
    this.password = bcrypt.hashSync(password, 10);
  }

  comparePassword(rawPassword: string): boolean {
    const userPassword = this.password;
    return bcrypt.compareSync(rawPassword, userPassword);
  }
}
