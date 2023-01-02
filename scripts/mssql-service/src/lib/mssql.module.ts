import { Module, Global } from '@nestjs/common';
import { MssqlService } from './mssql.service';

@Global()
@Module({
  providers: [MssqlService],
  exports: [MssqlService],
})
export class MssqlModule {}
