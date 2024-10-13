//This file will hold all the actions we need to implement the basic CRUD operations.

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Item } from 'src/app/core/models/item.model';

export const CourseApiActions = createActionGroup({
  source: 'CoursesApi',
  events: {
    'get courses': emptyProps(),
    'courses success': props<{
      courses: Item[];
    }>(),
    'courses failure': props<{
      error: any;
    }>(),
    'get course id': props<{
      id: number | undefined;
    }>(),
    'create course': props<{
      course: Item ;
    }>(),
    'delete course': props<{
      course: Item | undefined;
    }>(),
  },
});
