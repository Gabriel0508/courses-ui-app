//This file will hold all the actions we need to implement the basic CRUD operations.

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiError } from 'src/app/core/models/error.model';
import { Course } from 'src/app/core/models/course.model';

export const CourseApiActions = createActionGroup({
  source: 'CoursesApi',
  events: {
    'get courses': emptyProps(),
    'get courses success': props<{
      courses: Course[];
    }>(),
    'get courses failure': props<{
      error: ApiError;
    }>(),
    'create course': props<{
      course: Course;
    }>(),
    'create course success': props<{
      course: Course;
    }>(),
    'create course failure': props<{
      error: ApiError;
    }>(),
    'delete course': props<{
      id: string;
    }>(),
    'delete course success': props<{
      id: string;
    }>(),
    'delete course failure': props<{
      error: ApiError;
    }>(),
    'get course id': props<{
      id: string | undefined;
    }>(),
    'get course id success': props<{
      course: Course | undefined;
    }>(),
    'get course id failure': props<{
      error: ApiError;
    }>(),
  },
});
