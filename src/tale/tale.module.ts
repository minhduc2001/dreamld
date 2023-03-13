import { Module } from '@nestjs/common';
import { TaleService } from './tale.service';
import { TaleController } from './tale.controller';

@Module({
  providers: [TaleService],
  controllers: [TaleController],
})
export class TaleModule {}
