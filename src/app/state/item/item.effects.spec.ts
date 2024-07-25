import { TestBed, waitForAsync } from '@angular/core/testing';
import { ItemsEffects } from './item.effects';

describe('ItemsEffects', () => { //use marbles
  let effects: ItemsEffects;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemsEffects
      ],
    });

    effects = TestBed.inject(ItemsEffects);
  }));

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
