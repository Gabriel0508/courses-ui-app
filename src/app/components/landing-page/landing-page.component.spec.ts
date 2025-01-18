import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';


describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let store: MockStore;
  let router: Router;

  const mockItems = [
    {
      id: 1,
      description: 'Java',
      image: 'none',
      isEnable: true,
      name: 'Java',
      type: 'accepted',
      owner: {
        email: 'ademy.new@gmail.com',
        firstName: 'John',
        lastName: 'Bonn',
        id: 1,
        roles: {},
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageComponent],
      imports: [],
      providers: [provideMockStore({})],
    });

    fixture = TestBed.createComponent(LandingPageComponent);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to courses', () => {
    const expectedUrl = '/items';
    jest.spyOn(router, 'navigateByUrl');
    component.onNavigateToAllCourses();

    expect(router.navigateByUrl).toHaveBeenCalledWith(expectedUrl);
  });
});
