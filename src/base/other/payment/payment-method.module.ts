import { Module } from '@nestjs/common';
import { MomoPaymentService } from '@base/other/payment/momo-payment.service';

@Module({
  imports: [],
  providers: [MomoPaymentService],
  exports: [MomoPaymentService],
})
export class PaymentMethodModule {}
