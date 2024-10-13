//Here we will manage all side effects from action dispatching.
//In our case we will be calling the books service to manipulate the data.

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemService } from 'src/app/core/services/item.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { CourseApiActions } from './items.actions';
import { Item } from 'src/app/core/models/item.model';

@Injectable()
export class CoursesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly courseService: ItemService
  ) {}

  getCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseApiActions.getCourses),
      switchMap(() =>
        this.courseService.getItems().pipe(
          map((courses) => CourseApiActions.coursesSuccess({ courses })),
          catchError((error) => of(CourseApiActions.coursesFailure({ error })))
        )
      )
    )
  );

  // getCourseId$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CourseApiActions.getCourseId),
  //     switchMap(action =>
  //       this.courseService.getItemId(action.id).pipe(
  //         map(course => CourseApiActions.getCoursesSuccess({ courses: [course] })),
  //         catchError(error => of(CourseApiActions.getCoursesFailure({ error })))
  //       )
  //     )
  //   )
  // );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseApiActions.createCourse),
      mergeMap(({ course }) =>
        this.courseService.createCourse(course).pipe(
          map((newCourse: any) =>
            CourseApiActions.coursesSuccess({ courses: newCourse })
          ),
          catchError((error) => of(CourseApiActions.coursesFailure({ error })))
        )
      )
    )
  );
}
