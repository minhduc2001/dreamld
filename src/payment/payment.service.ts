import { Injectable, OnModuleInit } from '@nestjs/common';
import { LoggerService } from '@base/logger';
import { BaseService } from '@base/service/base.service';
import { Payment } from '@/payment/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from '@base/redis/redis.service';
import * as exc from '@base/api/exception.reslover';
import { EMethodPayment, EStatePayment } from '@/payment/payment.enum';
import { CreatePaymentDto } from '@/payment/payment.dto';
import { MomoPaymentService } from '@base/other/payment/momo-payment.service';
import { PackageService } from '@/payment/package.service';
import Redis from 'ioredis';
import { SubscriptionService } from '@/payment/subscription.service';
import { User } from '@/user/entities/user.entity';
import { EPackageExpire } from '@/payment/package.enum';

@Injectable()
export class PaymentService
  extends BaseService<Payment>
  implements OnModuleInit
{
  redisSubscriber: Redis;
  constructor(
    @InjectRepository(Payment)
    protected readonly repository: Repository<Payment>,
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    private readonly packageService: PackageService,
    private readonly loggerService: LoggerService,
    private readonly redisService: RedisService,
    private readonly momoPaymentService: MomoPaymentService,
    private readonly subscriptionService: SubscriptionService,
  ) {
    super(repository);
    this.redisSubscriber = new Redis();
  }
  private logger = this.loggerService.getLogger(PaymentService.name);

  async onModuleInit() {
    await this.redisSubscriber.psubscribe(
      '__keyevent@0__:expired',
      async (error, count) => {
        if (error) {
          this.logger.error(error);
          return;
        }
        console.log(`Subscribed to ${count} channel(s)`);
      },
    );

    this.redisSubscriber.on('pmessage', async (pattern, channel, message) => {
      if (channel === '__keyevent@0__:expired') {
        if (message.startsWith('transaction:')) {
          const id = message.split(':')[1];
          await this.cancelPayment(id);
        }
      }
    });
  }
  async getPayment(id: number) {
    const payment = await this.repository.findOne({ where: { id: id } });
    if (!payment)
      throw new exc.BadException({ message: 'không tồn tại thanh toán này' });
    return payment;
  }

  async createPayment(dto: CreatePaymentDto) {
    try {
      const pack = await this.packageService.getPackage(dto.packageId);
      const payment = await this.repository.save({
        amount: pack.amount,
        state: EStatePayment.Pending,
        paymentMethod: EMethodPayment.Momo,
        user: dto.user,
      });

      // await this.momoPaymentService.createPayment(
      //   Math.floor(Math.random() * 100) + generateUUID(),
      //   payment.id + '',
      //
      //   payment.amount,
      //   'haha',
      //   'localhost:8080/api/v1/payment/request-payment',
      // );
      //
      await this.redisService.setWithExpiration(
        `transaction:${payment.id}`,
        payment,
        5,
      );

      return payment;
    } catch (e) {
      this.logger.warn(e);
      throw new exc.BadException({ message: e.message });
    }
  }

  async cancelPayment(id: number) {
    try {
      const payment = await this.getPayment(id);
      payment.state = EStatePayment.Failure;
      await payment.save();
      return true;
    } catch (e) {
      throw new exc.BadException({ message: e.message });
    }
  }

  async confirmPayment(id: number) {
    try {
      const payment = await this.getPayment(id);
      payment.state = EStatePayment.Finished;
      await payment.save();
      const user = await this.userRepository.findOne({
        where: { id: payment.user.id },
      });
      user.packageId = payment.package.id;
      const date = new Date().getTime();
      if (payment.package.expire == EPackageExpire.Daily) {
        user.packageExpire = String(date + 86400000);
      } else if (payment.package.expire == EPackageExpire.Month) {
        user.packageExpire = String(date + 86400000 * 30);
      } else {
        user.packageExpire = String(date + 86400000 * 30 * 12);
      }
      await user.save();
      await this.subscriptionService.createSubscription({
        userId: user.id,
        delay: Number(user.packageExpire) - date,
      });
      return true;
    } catch (e) {
      throw new exc.BadException({ message: e.message });
    }
  }
}
