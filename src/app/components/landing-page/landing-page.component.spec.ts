import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import * as fromItems from '../../state/item/index';
import { Router } from '@angular/router';
import { Item } from 'src/app/core/models/item.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenericCardComponent } from 'src/app/shared/generic-card/generic-card.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let store: MockStore;
  let router: Router;
  let mockSelectItemList: MemoizedSelector<any, any[]>;

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

    mockSelectItemList = store.overrideSelector(fromItems.selectItemList, []);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize courses with items from the store', () => {
    mockSelectItemList.setResult(mockItems);
    store.refreshState();

    component.initSubscriptions();
    component.allCourses$?.subscribe((items) => {
      expect(items).toEqual(mockItems);
    });
  });

  it('should get items from the store', () => {
    jest.spyOn(store, 'dispatch');
    const action = fromItems.getItems();
    store.refreshState();
    component.initDispatch();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should navigate to courses', () => {
    const url = 'somewhere';
    const expectedUrl = '/items';
    jest.spyOn(router, 'navigateByUrl');
    component.onNavigateToAllCourses(url);

    expect(router.navigateByUrl).toHaveBeenCalledWith(expectedUrl);
  });

  it('should delete item from store', () => {
    jest.spyOn(store, 'dispatch');
    const item: Item = {
      id: 1,
      name: 'string',
      description: 'string',
      isEnable: true,
      type: 'string',
      owner: {
        id: 1,
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        roles: {},
      },
      image: 'string',
    };
    const action = fromItems.deleteItem({ item });
    component.onDeleteItem(item);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
