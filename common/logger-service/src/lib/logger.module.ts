import { Global, Module } from '@nestjs/common';
import { Logger } from './logger.service';

@Global()
@Module({ imports: [LoggerModule], providers: [Logger], exports: [Logger] })
export class LoggerModule {}
