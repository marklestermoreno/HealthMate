import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { assetsResolver } from './assets.resolver';

describe('assetsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => assetsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
