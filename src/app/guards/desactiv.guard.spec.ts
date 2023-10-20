import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { desactivGuard } from './desactiv.guard';

describe('desactivGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => desactivGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
