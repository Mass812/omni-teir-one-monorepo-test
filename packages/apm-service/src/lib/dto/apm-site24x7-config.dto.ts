import { IApmConfigDto } from '../interfaces/apm-config-dto.interface';

export class ApmSite24x7ConfigDto implements IApmConfigDto {
  name: string;
  environment: string;
  isEnabled: boolean;
  licenseKey: string;
  port: number;

  appName() {
    if (this.isValidConfig()) {
      return `${this.name}-${this.environment}`;
    }

    return '';
  }

  canGenerate(): boolean {
    if (!this.isEnabled) {
      return false;
    }

    return this.isValidConfig();
  }

  isValidConfig(): boolean {
    if (this.licenseKey && this.port && this.environment) {
      return true;
    } else {
      return false;
    }
  }
}
