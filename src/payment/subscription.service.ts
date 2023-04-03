import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectQueue('terminate-package') private subscriptionQueue: Queue,
  ) {}

  async createSubscription(subscriptionData: any): Promise<void> {
    // đưa job vào queue với payload là subscriptionData
    await this.subscriptionQueue.add('cancelSubscription', subscriptionData, {
      delay: subscriptionData?.delay,
    });
  }
}
