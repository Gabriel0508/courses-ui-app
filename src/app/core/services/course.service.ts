import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courseUrl = 'http://localhost:8080/courses';

  constructor(private readonly http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    console.log();
    return this.http.get<Course[]>(`${this.courseUrl}`);
  }

  getCourseById(id: number | undefined): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.courseUrl}/${id}`);
  }

  createCourse(item: Course | undefined): Observable<Course> {
    return this.http.post<Course>(`${this.courseUrl}`, item);
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`http://localhost:8080/courses/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
