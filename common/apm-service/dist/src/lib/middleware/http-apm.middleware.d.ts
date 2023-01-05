import { NestMiddleware } from '@nestjs/common';
import { ApmService } from '../apm.service';
import { ApmWrapper } from '../apm-wrapper';
import { NextFunction, Request, Response } from 'express';
export interface ApmResponse extends Response {
  apm?: ApmWrapper;
}
export declare class HttpApmMiddleware implements NestMiddleware {
  private readonly apmService;
  constructor(apmService: ApmService);
  use(req: Request, res: ApmResponse, next: NextFunction): void;
}
