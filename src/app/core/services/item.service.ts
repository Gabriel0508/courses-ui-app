import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private courseUrl = 'http://localhost:8080/courses';

  constructor(private readonly http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.courseUrl}`);
  }

  createItem(item: Item): Observable<Item> {
    //this.courseUrl = [...this.courseUrl, item];
    return of(item);
  }

  deleteItem(item: Item): Observable<Item> {
    //this.courseUrl = this.courseUrl.filter((it) => it.id !== item.id);
    return of(item);
  }
}
