import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Course } from '../models/course.model';

import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  // private courseUrl = 'http://localhost:8080/courses';

  // constructor(private readonly http: HttpClient) {}

  // getCourses(): Observable<Course[]> {
  //   return this.http.get<Course[]>(`${this.courseUrl}`);
  // }

  // getCourseById(id: number | undefined): Observable<Course | undefined> {
  //   return this.http.get<Course>(`${this.courseUrl}/${id}`);
  // }

  // createCourse(item: Course | undefined): Observable<Course> {
  //   return this.http.post<Course>(`${this.courseUrl}`, item);
  // }

  // deleteCourse(id: number): Observable<Course> {
  //   return this.http.delete<Course>(`http://localhost:8080/courses/${id}`, {
  //     responseType: 'text' as 'json',
  //   });
  // }

  private collectionName = 'courses';
  private coursesCollection: CollectionReference<Course>;

  constructor(private firestore: Firestore) {
    // Create a reference to the "courses" collection in Firestore
    this.coursesCollection = collection(
      this.firestore,
      this.collectionName
    ) as CollectionReference<Course>;
  }

  /**
   * Retrieve all courses.
   * The { idField: 'id' } option automatically includes the document ID in each Course object.
   */
  getCourses(): Observable<Course[]> {
    return collectionData(this.coursesCollection, {
      idField: 'id',
    }) as Observable<Course[]>;
  }

  /**
   * Retrieve a single course by document ID.
   * Returns an observable that emits the course data (or undefined if not found).
   */
  getCourseById(id: string | undefined): Observable<Course | undefined> {
    const courseDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(courseDocRef, { idField: 'id' }) as Observable<
      Course | undefined
    >;
  }

  /**
   * Create a new course document in Firestore.
   * Returns an observable that completes once the document is added.
   */
  createCourse(course: Course): Observable<any> {
    return from(addDoc(this.coursesCollection, course));
  }

  /**
   * Update an existing course document.
   * Accepts a partial Course, so you can update only specific fields if needed.
   */
  updateCourse(id: string, course: Partial<Course>): Observable<void> {
    const courseDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(updateDoc(courseDocRef, course));
  }

  /**
   * Delete a course document by its ID.
   */
  deleteCourse(id: string): Observable<void> {
    const courseDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(deleteDoc(courseDocRef));
  }
}
