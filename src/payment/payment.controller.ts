import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from '@/payment/payment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '@/auth/decorator/public.decorator';
import { CreatePaymentDto } from '@/payment/payment.dto';
import { GetUser } from '@/auth/decorator/get-user.decorator';
import { User } from '@/user/entities/user.entity';

@ApiTags('Payment')
@Controller('payment')
@ApiBearerAuth()
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post()
  async createPayment(@Body() dto: CreatePaymentDto, @GetUser() user: User) {
    return this.service.createPayment({ ...dto, user: user });
  }

  // @Public()
  // @Get('/request-payment')
  // async redirect(@Req() req) {
  //   await this.service.test();
  //   console.log(12345);
  //   return 'thanh cong';
  // }
}
