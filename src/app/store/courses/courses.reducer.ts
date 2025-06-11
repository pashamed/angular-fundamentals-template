// import { Action } from '@ngrx/store';

// // Add your code here

// export interface CoursesState {
//     // Add your code here
// }

// export const initialState: CoursesState = {
//     // Add your code here
// };

// export const coursesReducer; // Add your code here

// export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);


import { Action } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { Course } from '@app/types';  // Assuming you have a Course type defined
import * as CoursesActions from './courses.actions';  // Import your actions

// Define the CoursesState interface
export interface CoursesState {
  courses: Course[];  // List of all courses
  selectedCourse: Course | null;  // Single course for details page
  loading: boolean;  // Indicates if data is loading
  error: string | null;  // Stores any error message
  filteredCourses: Course[];  // List of filtered courses
}

// Initial state setup
export const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
  filteredCourses: [],
};

// Define the reducer using the `createReducer` function
export const coursesReducer = createReducer(
  initialState,

  // Requesting all courses
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Successfully fetched all courses
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
  })),

  // Failed to fetch all courses
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Requesting a single course
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    loading: true,
  })),

  // Successfully fetched a single course
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    selectedCourse: course,
    loading: false,
  })),

  // Failed to fetch a single course
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Requesting filtered courses
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Successfully fetched filtered courses
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    filteredCourses: courses,
    loading: false,
  })),

  // Failed to fetch filtered courses
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Requesting course deletion
  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    loading: true,
  })),

  // Successfully deleted a course
  on(CoursesActions.requestDeleteCourseSuccess, (state, { courseId }) => ({
    ...state,
    courses: state.courses.filter((course) => course.id !== courseId),
    loading: false,
  })),

  // Failed to delete a course
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Requesting course editing
  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    loading: true,
  })),

  // Successfully edited a course
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    courses: state.courses.map((c) =>
      c.id === course.id ? { ...c, ...course } : c
    ),
    loading: false,
  })),

  // Failed to edit a course
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Requesting course creation
  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    loading: true,
  })),

  // Successfully created a course
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course],
    loading: false,
  })),

  // Failed to create a course
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

// Export the reducer
export const reducer = (state: CoursesState | undefined, action: Action): CoursesState =>
  coursesReducer(state, action);
