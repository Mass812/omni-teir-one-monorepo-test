import { MssqlPoolStatus } from './mssql-pool-status.enum';

export interface IMssqlService {
  connect(database: string): Promise<void>;
  status(database: string): MssqlPoolStatus;
  close(database: string): Promise<void>;
  getRequest(database: string): any;
}
