import * as ApmInsight from 'apminsight';
import {
  APM_CONFIG_NAME,
  APM_WEBSERVER_CONFIG_NAME,
} from '../../apm.constants';
import { ApmSite24x7ConfigDto } from '../../dto/apm-site24x7-config.dto';
import { ApmWrapper } from '../../apm-wrapper';
import { ConfigService } from '../../../../../config-service/dist/src';
import { Inject, Injectable } from '@nestjs/common';
import { IApmRepository } from '../../interfaces/apm-repository.interface';

@Injectable()
export class ApmSite24x7Store implements IApmRepository {
  private dto: ApmSite24x7ConfigDto;

  constructor(
    @Inject(APM_CONFIG_NAME) configName: string,
    @Inject(APM_WEBSERVER_CONFIG_NAME) configWebServerName: string,
    @Inject(ConfigService) configService: ConfigService
  ) {
    const config: Record<string, any> = configService.get(configName);
    const configWebserver: Record<string, any> =
      configService.get(configWebServerName);

    this.dto = new ApmSite24x7ConfigDto();
    this.dto.environment = process.env.NODE_ENV;
    this.dto.isEnabled = config['enable'];
    this.dto.licenseKey = config['licenseKey'];
    this.dto.name = config['name'];

    if (configWebserver['http']['enable']) {
      this.dto.port = parseInt(configWebserver['http']['port']);
    } else if (configWebserver['https']['enable']) {
      this.dto.port = parseInt(configWebserver['https']['port']);
    }
  }

  getApm(): ApmWrapper {
    if (!this.dto.canGenerate()) {
      return new ApmWrapper();
    }

    return new ApmWrapper(
      (ApmInsight as any)({
        licenseKey: this.dto.licenseKey,
        appName: this.dto.appName(),
        port: this.dto.port,
      })
    );
  }
}
