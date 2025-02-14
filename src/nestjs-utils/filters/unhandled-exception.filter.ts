import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ILoggerService } from '../../share-modules/logger/interface/logger-service.interface';
import { BaseExceptionFilter } from '@nestjs/core';
import { ErrorBody } from '../../common/constants/error-body';

@Catch()
export class UnhandledExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly logger: ILoggerService) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      process.env.NODE_ENV !== 'prod' ? (exception as any).message : '';
    const error = ErrorBody.INTERNAL_SERVER_ERROR;

    const reqBody = req?.body ? JSON.stringify(req.body) : '';

    // Send alert here or in logging server
    this.logger.error(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `[${new Date()}] [${req.method}] ${req.url}/ body:${reqBody} / code:${error}- ${exception} - ${(exception as any).stack}}`,
    );

    res.status(status).json({ ...error, detail: message });
  }
}
