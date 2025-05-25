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
  serverTimestamp,
} from '@angular/fire/firestore';
import cloneDeep from 'lodash-es/cloneDeep';
import { UploadProgress } from '../models/file.model';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from '@angular/fire/storage';

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

  createCourse(course: Course): Observable<Course> {
    const coursesRef = collection(this.firestore, this.collectionName);
    const payload = {
      ...course,
      createdAt: serverTimestamp(),
    };
    return from(addDoc(coursesRef, payload)).pipe(
      map((docRef) => {
        return {
          id: docRef.id,
          ...payload,
        } as Course;
      })
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

  uploadFile(file: File): Observable<UploadProgress> {
    const storage = getStorage(); 
    const path = `courses/uploads/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    return new Observable<UploadProgress>((observer) => {
      const unsubscribe = task.on(
        'state_changed',
        (snap) => {
          const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
          observer.next({ progress: pct });
        },
        (err) => observer.error(err),
        () => {
          getDownloadURL(storageRef)
            .then((url) => {
              observer.next({ progress: 100, downloadURL: url });
              observer.complete();
            })
            .catch((e) => observer.error(e));
        }
      );
      return { unsubscribe };
    });
  }

  downloadFile(downloadURL: string): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      fetch(downloadURL)
        .then((res) => res.blob())
        .then((blob) => {
          observer.next(blob);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  }
}
