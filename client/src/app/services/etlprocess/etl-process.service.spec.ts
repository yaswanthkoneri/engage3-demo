import { TestBed, inject } from '@angular/core/testing';

import { EtlProcessService } from './etl-process.service';

describe('EtlProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtlProcessService]
    });
  });

  it('should be created', inject([EtlProcessService], (service: EtlProcessService) => {
    expect(service).toBeTruthy();
  }));
});
