//Here we will manage all side effects from action dispatching.
//In our case we will be calling the course service to manipulate the data.

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from 'src/app/core/services/course.service';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { CourseApiActions } from './item.actions';

@Injectable()
export class CoursesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly courseService: CourseService
  ) {}

  getCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseApiActions.getCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => CourseApiActions.getCoursesSuccess({ courses })),
          catchError((error) =>
            of(CourseApiActions.getCoursesFailure({ error }))
          )
        )
      )
    )
  );

  getCourseId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseApiActions.getCourseId),
      exhaustMap((action) =>
        this.courseService.getCourseById(action.id).pipe(
          map(
            (course) => CourseApiActions.getCourseIdSuccess({ course }),
            catchError((error) =>
              of(CourseApiActions.getCourseIdFailure({ error }))
            )
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseApiActions.createCourse),
      exhaustMap(({ course }) =>
        this.courseService.createCourse(course).pipe(
          map((newCourse) =>
            CourseApiActions.createCourseSuccess({ course: newCourse })
          ),
          catchError((error) =>
            of(CourseApiActions.createCourseFailure({ error }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseApiActions.deleteCourse),
      exhaustMap(({ id }) =>
        this.courseService.deleteCourse(id).pipe(
          map(() => CourseApiActions.deleteCourseSuccess({ id })),
          catchError((error) =>
            of(CourseApiActions.deleteCourseFailure({ error }))
          )
        )
      )
    )
  );
}
