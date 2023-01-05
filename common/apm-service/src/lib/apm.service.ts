import { Inject, Injectable } from '@nestjs/common';
import { ApmWrapper } from './apm-wrapper';
import { IApmRepository } from './interfaces/apm-repository.interface';

@Injectable()
export class ApmService {
  constructor(@Inject('IApmRepository') public apmRepository: IApmRepository) {}

  getApm(): ApmWrapper {
    return this.apmRepository.getApm();
  }
}
