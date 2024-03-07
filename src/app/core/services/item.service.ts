import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemsUrl = '/assets/api/items.json';

  constructor(private readonly http: HttpClient) {}

  getItems(): Observable<Item[]> {
    //return of(this.itemsUrl);
    return this.http.get<Item[]>(`${this.itemsUrl}`)
  }

  createItem(item: Item): Observable<Item> {
   //this.itemsUrl = [...this.itemsUrl, item];
    return of(item);
  }

  deleteItem(item: Item): Observable<Item> {
   //this.itemsUrl = this.itemsUrl.filter((it) => it.id !== item.id);
    return of(item);
  }
}
