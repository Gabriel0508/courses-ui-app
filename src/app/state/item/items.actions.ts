//This file will hold all the actions we need to implement the basic CRUD operations.

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiError } from 'src/app/core/models/error.model';
import { Item } from 'src/app/core/models/item.model';

export const CourseApiActions = createActionGroup({
  source: 'CoursesApi',
  events: {
    'get courses': emptyProps(),
    'get courses success': props<{
      courses: Item[];
    }>(),
    'get courses failure': props<{
      error: ApiError;
    }>(),
    'create course': props<{
      course: Item;
    }>(),
    'create course success': props<{
      course: Item;
    }>(),
    'create course failure': props<{
      error: ApiError;
    }>(),
    'delete course': props<{
      id: number;
    }>(),
    'delete course success': props<{
      id: number;
    }>(),
    'delete course failure': props<{
      error: ApiError;
    }>(),
    'get course id': props<{
      id: number | undefined;
    }>(),
    'get course id success': props<{
      course: Item | undefined;
    }>(),
    'get course id failure': props<{
      error: ApiError;
    }>(),
  },
});
