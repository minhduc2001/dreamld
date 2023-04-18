import { Processor, OnQueueActive, Process } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/user/entities/user.entity';

@Processor('terminate-package')
@Injectable()
export class TerminatePackageConsumer {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Process('cancelSubscription')
  async onActive(job) {
    console.log(job.data, 'jajajj');
    // const userId = job.data.userId;
    // const user = await this.userRepository.findOne(userId);
    //
    // if (user && user.packageExpire <= new Date()) {
    //   user.packageId = null;
    //   user.packageExpire = null;
    //   await user.save();
    //   console.log(`Terminated package`);
    // }
  }
}
