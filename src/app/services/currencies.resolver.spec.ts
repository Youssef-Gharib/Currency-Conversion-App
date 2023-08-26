import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { currenciesResolver } from './currencies.resolver';

describe('currenciesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => currenciesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
