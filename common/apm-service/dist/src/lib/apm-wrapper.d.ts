export declare class ApmWrapper {
  private readonly apm?;
  constructor(apm?: any);
  setTransactionName(name: string): void;
  endTransaction(): void;
  trackError(e: any): void;
  private apmExists;
  private apmAndMethodExist;
}
