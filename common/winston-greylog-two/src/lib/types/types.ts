import TransportStream = require('winston-transport');

export interface iGraylog2Transport {
  graylog: GraylogOptions;
  GraylogServer: GraylogServer;
  StaticMeta: StaticMeta;
  TransportOptions: TransportOptions;
  GraylogOptions: GraylogOptions;
}
export declare class Graylog2Transport extends TransportStream {
  constructor(options?: iGraylog2Transport['TransportOptions']);
}

// declare namespace Graylog2Transport {
type GraylogServer = {
  host: string;
  port: number;
};

type GraylogOptions = {
  servers: GraylogServer[];
  hostname?: string;
  facility?: string;
  bufferSize?: number;
};

type StaticMeta = {
  [index: string]: any;
};

interface TransportOptions extends TransportStream.TransportStreamOptions {
  name?: string;
  exceptionsLevel?: string;
  graylog?: GraylogOptions;
  staticMeta?: StaticMeta;
}
// }
