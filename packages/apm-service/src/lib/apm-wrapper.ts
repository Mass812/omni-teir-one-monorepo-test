import { Injectable } from '@nestjs/common';

@Injectable()
export class ApmWrapper {
  private readonly apm?: any;

  constructor(apm?: any) {
    this.apm = apm;
  }

  public setTransactionName(name: string): void {
    if (this.apmAndMethodExist('setTransactionName')) {
      this.apm.setTransactionName(name);
    }
  }

  public endTransaction(): void {
    if (this.apmAndMethodExist('endTransaction')) {
      this.apm.endTransaction();
    }
  }

  public trackError(e: any): void {
    if (this.apmAndMethodExist('trackError')) {
      this.apm.trackError(e);
    }
  }

  private apmExists(): boolean {
    return !!this.apm;
  }

  private apmAndMethodExist(methodName: string): boolean {
    if (!this.apmExists()) {
      return false;
    }

    return typeof this.apm[methodName] === 'function';
  }
}
