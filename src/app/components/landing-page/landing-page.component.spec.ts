import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Item } from 'src/app/core/models/item.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenericCardComponent } from 'src/app/shared/generic-card/generic-card.component';

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
    const url = 'somewhere';
    const expectedUrl = '/items';
    jest.spyOn(router, 'navigateByUrl');
    component.onNavigateToAllCourses(url);

    expect(router.navigateByUrl).toHaveBeenCalledWith(expectedUrl);
  });
});
