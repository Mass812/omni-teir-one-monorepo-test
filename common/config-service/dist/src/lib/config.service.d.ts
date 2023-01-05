import { IConfigService } from './types/config.service-interface';
export declare class ConfigService implements IConfigService {
  get<T>(property: string): T;
  private getEnv;
  isDb166(): boolean;
  isProd(): boolean;
  isQa(): boolean;
  isQa1(): boolean;
  isQa2(): boolean;
  isQa3(): boolean;
  isQa4(): boolean;
  isDev(): boolean;
  isPreview(): boolean;
  isStage(): boolean;
}
