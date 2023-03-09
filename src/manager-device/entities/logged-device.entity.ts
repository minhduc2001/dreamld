import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { User } from '@/user/entities/user.entity';
import { Device } from '@/manager-device/entities/device.entity';

@Entity()
export class LoggedDevice extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.loggedDevice)
  user: User;

  @ManyToOne(() => Device, (device) => device)
  device: Device;
}
