import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDetailsComponent } from './courses-details.component';

describe('ItemsDetailsComponent', () => {
  let component: ItemsDetailsComponent;
  let fixture: ComponentFixture<ItemsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsDetailsComponent]
    });
    fixture = TestBed.createComponent(ItemsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
