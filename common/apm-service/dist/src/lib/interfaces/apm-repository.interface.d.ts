import { ApmWrapper } from '../apm-wrapper';
export interface IApmRepository {
  getApm(): ApmWrapper;
}
