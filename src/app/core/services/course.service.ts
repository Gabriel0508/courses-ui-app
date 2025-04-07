import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { Course } from '../models/course.model';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import cloneDeep from 'lodash-es/cloneDeep';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private collectionName = 'courses';

  constructor(private firestore: Firestore) {}

  getCourses(): Observable<Course[]> {
    const coursesRef = collection(this.firestore, this.collectionName);
    return (
      collectionData(coursesRef, { idField: 'id' }) as Observable<Course[]>
    ).pipe(map((courses) => cloneDeep(courses)));
  }

  getCourseById(id: string | undefined): Observable<Course | undefined> {
    const courseDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return (
      docData(courseDocRef, { idField: 'id' }) as Observable<Course | undefined>
    ).pipe(map((course) => (course ? cloneDeep(course) : undefined)));
  }

  createCourse(course: Course): Observable<any> {
    const coursesRef = collection(this.firestore, this.collectionName);
    const clonedCourse = cloneDeep(course);

    return from(addDoc(coursesRef, clonedCourse)).pipe(
      map((docRef) => ({
        id: docRef.id,
        ...clonedCourse,
      }))
    );
  }

  updateCourse(id: string, course: Partial<Course>): Observable<void> {
    const courseDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(updateDoc(courseDocRef, course));
  }

  deleteCourse(id: string): Observable<void> {
    const courseDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(deleteDoc(courseDocRef));
  }
}
