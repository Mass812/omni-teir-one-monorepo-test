import { IApmConfigDto } from '../interfaces/apm-config-dto.interface';
export declare class ApmSite24x7ConfigDto implements IApmConfigDto {
  name: string;
  environment: string;
  isEnabled: boolean;
  licenseKey: string;
  port: number;
  appName(): string;
  canGenerate(): boolean;
  isValidConfig(): boolean;
}
