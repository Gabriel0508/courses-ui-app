import { createReducer, on } from '@ngrx/store';
import { CourseApiActions } from './item.actions';
import { Course } from 'src/app/core/models/item.model';

export interface CourseState {
  courses: Course[];
  selectedCourse: Course | undefined;
  error: any;
  loading: boolean;
}

export const initialState: CourseState = {
  courses: [],
  selectedCourse: undefined,
  error: null,
  loading: false,
};

export const courseReducer = createReducer(
  initialState,
  on(CourseApiActions.getCourses, (state) => ({
    ...state,
    loading: true,
  })),
  on(CourseApiActions.getCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
  })),
  on(CourseApiActions.getCoursesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(CourseApiActions.createCourse, (state) => ({
    ...state,
    loading: true,
  })),
  on(CourseApiActions.createCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course],
    loading: false,
  })),
  on(CourseApiActions.createCourseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(CourseApiActions.deleteCourse, (state, { id }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CourseApiActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter((course) => course.id !== id),
    loading: false,
  })),
  on(CourseApiActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  // on(CourseApiActions.getCourseId, (state, { id }) => ({
  //   ...state,
  //   selectedCourseId: id,
  // })),
  on(CourseApiActions.getCourseIdSuccess, (state, { course }) => ({
    ...state,
    selectedCourse: course,
    error: null,
  })),
  on(CourseApiActions.getCourseIdFailure, (state, { error }) => ({
    ...state,
    selectedCourse: undefined,
    error,
  }))
);
