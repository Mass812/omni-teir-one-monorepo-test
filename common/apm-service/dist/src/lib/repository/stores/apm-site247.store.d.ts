import { ApmWrapper } from '../../apm-wrapper';
import { ConfigService } from '@ts-omni/config-service';
import { IApmRepository } from '../../interfaces/apm-repository.interface';
export declare class ApmSite24x7Store implements IApmRepository {
  private dto;
  constructor(
    configName: string,
    configWebServerName: string,
    configService: ConfigService
  );
  getApm(): ApmWrapper;
}
