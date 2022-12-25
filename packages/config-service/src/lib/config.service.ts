import * as config from 'config';
import { IConfigService } from './types/config.service-interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService implements IConfigService {
  get<T>(property: string): T {
    if (!config.has(property)) return null;

    return config.get(property);
  }

  private getEnv(): string {
    return config.util.getEnv('NODE_ENV').toLocaleLowerCase();
  }

  isDb166(): boolean {
    return (
      this.get<string>('mssql.ultramerchant.server').slice(0, 5) == 'db166'
    );
  }

  isProd(): boolean {
    return this.getEnv() === 'production';
  }

  isQa(): boolean {
    return this.getEnv().slice(0, 2) === 'qa';
  }

  isQa1(): boolean {
    return this.getEnv() === 'qa1';
  }

  isQa2(): boolean {
    return this.getEnv() === 'qa2';
  }

  isQa3(): boolean {
    return this.getEnv() === 'qa3';
  }

  isQa4(): boolean {
    return this.getEnv() === 'qa4';
  }

  isDev(): boolean {
    return this.getEnv() === 'development';
  }

  isPreview(): boolean {
    return this.getEnv() === 'preview';
  }

  isStage(): boolean {
    return this.getEnv() === 'stg';
  }
}
