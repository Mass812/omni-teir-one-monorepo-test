import Transport from 'winston-transport';
import { iGraylog2Transport, Graylog2Transport } from './types/types';
export declare class Graylog2 extends Transport {
  graylog: iGraylog2Transport['GraylogOptions'];
  name: string;
  exceptionsLevel: string;
  silent: boolean;
  handleExceptions: boolean;
  graylog2Client: Graylog2Transport;
  staticMeta: iGraylog2Transport['StaticMeta'];
  constructor(options: any);
  log(
    info: {
      message: string;
      level: string;
      metadata: any;
    },
    callback: () => void
  ): void;
  close(): void;
}
