import { ApmService } from '../src/lib/apm.service';
import { IApmRepository } from '../src/lib/interfaces/apm-repository.interface';
import { ApmWrapper } from '../src/lib/apm-wrapper';

describe('ApmService', () => {
  let apmService: ApmService;
  let apmRepositoryMock: IApmRepository;

  beforeEach(() => {
    apmRepositoryMock = {
      getApm: jest.fn(),
    };
    apmService = new ApmService(apmRepositoryMock);
  });

  it('should call apmRepository.getApm()', () => {
    apmService.getApm();
    expect(apmRepositoryMock.getApm).toHaveBeenCalled();
  });

  // it('should return the result of apmRepository.getApm()', () => {
  //   const expectedResult = new ApmWrapper();
  //   apmRepositoryMock.getApm.mockReturnValue(expectedResult);
  //   const result = apmService.getApm();
  //   expect(result).toBe(expectedResult);
  // });
});
