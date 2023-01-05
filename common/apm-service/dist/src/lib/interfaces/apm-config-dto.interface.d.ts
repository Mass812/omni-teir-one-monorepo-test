export interface IApmConfigDto {
  name: string;
  environment: string;
  isEnabled: boolean;
  licenseKey: string;
  port: number;
  appName(): string;
  canGenerate(): boolean;
  isValidConfig(): boolean;
}
