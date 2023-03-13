import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { LoggerService } from '@base/logger';

import * as exc from '@base/api/exception.reslover';
import { config } from '@/config';

@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  private logger = this.loggerService.getLogger('unknown-exception');
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (host.getType() !== 'http') return;

    const e = new exc.BusinessException({
      errorCode: exc.SYSTEM_ERROR,
    }).getResponse();

    this.logger.error(exception);
    response.status(500).json(e);
  }
}
