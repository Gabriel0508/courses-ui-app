import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

describe('Courses Component', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      declarations: [CoursesComponent]
    });
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});