import { TestBed, waitForAsync } from '@angular/core/testing';
import { ItemsEffects } from './item.effects';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';

describe('ItemsEffects', () => {
  let effects: ItemsEffects;
  let actions: Observable<any>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemsEffects,
        provideMockActions(() => actions),
      ],
      //schemas: [NO_ERRORS_SCHEMA]
    });

    effects = TestBed.inject(ItemsEffects);
  }));

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
