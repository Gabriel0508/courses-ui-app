import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private courseUrl = 'http://localhost:8080/courses';

  constructor(private readonly http: HttpClient) {}

  getItems(): Observable<Item[]> {
    console.log();
    return this.http.get<Item[]>(`${this.courseUrl}`);
  }

  getCourseById(id: number | undefined): Observable<Item | undefined> {
    return this.http.get<Item>(`${this.courseUrl}/${id}`);
  }

  createCourse(item: Item | undefined): Observable<Item> {
    return this.http.post<Item>(`${this.courseUrl}`, item);
  }

  deleteCourse(id: number): Observable<Item> {
    return this.http.delete<Item>(`http://localhost:8080/courses/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
