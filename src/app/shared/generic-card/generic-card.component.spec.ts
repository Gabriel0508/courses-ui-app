import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCardComponent } from './generic-card.component';

describe('GenericCardComponent', () => {
  let component: GenericCardComponent;
  let fixture: ComponentFixture<GenericCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericCardComponent]
    });
    fixture = TestBed.createComponent(GenericCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the corect id on opening the course', () => {
    jest.spyOn(component.openCourse, 'emit');
    const testId = 'test-id';
    component.id = testId;
    component.onOpenCourse();

    expect(component.openCourse.emit).toHaveBeenCalledWith(testId);
  })
});
