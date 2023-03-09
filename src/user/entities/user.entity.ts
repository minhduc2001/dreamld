import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ERole } from '@/role/enum/roles.enum';
import { AbstractEntity } from '@/base/service/abstract-entity.service';
import { Permission } from '@/role/entities/permission.entity';
import { JoinTable } from 'typeorm';
import { EState } from '@shared/enum/common.enum';
import { Device } from '@/manager-device/entities/device.entity';
import { LoggedDevice } from '@/manager-device/entities/logged-device.entity';

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
  @JoinTable()
  loggedDevice: LoggedDevice[];

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
