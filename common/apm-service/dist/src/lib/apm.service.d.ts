import { ApmWrapper } from './apm-wrapper';
import { IApmRepository } from './interfaces/apm-repository.interface';
export declare class ApmService {
  apmRepository: IApmRepository;
  constructor(apmRepository: IApmRepository);
  getApm(): ApmWrapper;
}
