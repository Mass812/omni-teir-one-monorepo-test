import { Injectable, NestMiddleware } from '@nestjs/common';
import { ApmService } from '../apm.service';
import { ApmWrapper } from '../apm-wrapper';
import { NextFunction, Request, Response } from 'express';

export interface ApmResponse extends Response {
  apm?: ApmWrapper;
}

@Injectable()
export class HttpApmMiddleware implements NestMiddleware {
  constructor(private readonly apmService: ApmService) {}

  use(req: Request, res: ApmResponse, next: NextFunction) {
    const apmWrapper: ApmWrapper = res?.apm ?? this.apmService.getApm();
    apmWrapper.setTransactionName(req.originalUrl);

    res['apm'] = apmWrapper;

    next();
  }
}
