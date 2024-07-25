import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerComponent]
    });
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit navigateToCourses event with the correct URL', () => {
    jest.spyOn(component.navigateToCourses, 'emit');
    const testUrl = 'example-url';
    component.onNavigateToCourses(testUrl);

    expect(component.navigateToCourses.emit).toHaveBeenCalledWith(testUrl);
  });
});
