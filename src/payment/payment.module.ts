import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodModule } from '@base/other/payment/payment-method.module';
import { Payment } from '@/payment/payment.entity';
import { RedisModule } from '@base/redis/redis.module';
import { Package } from '@/payment/package.entity';
import { PackageService } from '@/payment/package.service';
import { PackageController } from '@/payment/package.controller';
import { BullModule } from '@nestjs/bull';
import { SubscriptionService } from '@/payment/subscription.service';
import { User } from '@/user/entities/user.entity';
import { TerminatePackageConsumer } from '@/payment/terminate-package-consumer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Package, User]),
    BullModule.registerQueue({
      name: 'terminate-package',
    }),
    PaymentMethodModule,
    RedisModule,
  ],
  providers: [
    PaymentService,
    PackageService,
    SubscriptionService,
    TerminatePackageConsumer,
  ],
  controllers: [PaymentController, PackageController],
})
export class PaymentModule {}
