import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';
import { LoggedDevice } from '@/manager-device/entities/logged-device.entity';

@Entity()
export class Device extends AbstractEntity {
  @Column({ nullable: false, unique: true })
  deviceId: string;

  @Column({ nullable: true })
  deviceType: string;

  @Column({ nullable: true })
  osVersion: string;

  @Column({ nullable: true })
  deviceName: string;

  @OneToMany(() => LoggedDevice, (loggedDevice) => loggedDevice.device)
  loggedDevice: LoggedDevice[];
}
