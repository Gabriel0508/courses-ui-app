import { ItemService } from './item.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Item } from '../models/item.model';

describe('ItemService', () => {
  let itemService: ItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService],
    });
    itemService = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(itemService).toBeTruthy();
  });

  it('should get the items from API', () => {
    const dummyItems: Item[] = [
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

    itemService.getItems().subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items).toEqual(dummyItems);
    });

    const req = httpMock.expectOne(`${itemService['courseUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyItems);  // to simulate the backend response with the mock data.
  });

  it('should create item', () => {});
});
