import { Module } from '@nestjs/common';
import { MailerController } from '@/mailer/mailer.controller';
import { MailerService } from '@/mailer/mailer.service';

@Module({
  imports: [],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
