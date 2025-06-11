// import { createAction, props } from '@ngrx/store';
// import { CoursesConstants } from '@app/store/courses/courses.constants';

// // Add your code here

import { createAction, props } from '@ngrx/store';
import { CoursesConstants } from '@app/store/courses/courses.constants';
import { Course } from '@app/types';  // Assuming you have a Course type defined

// Action for requesting all courses
export const requestAllCourses = createAction(
  CoursesConstants.REQUEST_ALL_COURSES
);

// Action for successfully fetching all courses
export const requestAllCoursesSuccess = createAction(
  CoursesConstants.REQUEST_ALL_COURSES_SUCCESS,
  props<{ courses: Course[] }>()  // We will return an array of courses
);

// Action for failure to fetch all courses
export const requestAllCoursesFail = createAction(
  CoursesConstants.REQUEST_ALL_COURSES_FAIL,
  props<{ error: any }>()  // Error returned in case of failure
);

// Action for requesting a single course
export const requestSingleCourse = createAction(
  CoursesConstants.REQUEST_SINGLE_COURSE,
  props<{ courseId: string }>()  // Passing the courseId as parameter
);

// Action for successfully fetching a single course
export const requestSingleCourseSuccess = createAction(
  CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS,
  props<{ course: Course }>()  // We return the fetched course
);

// Action for failure to fetch a single course
export const requestSingleCourseFail = createAction(
  CoursesConstants.REQUEST_SINGLE_COURSE_FAIL,
  props<{ error: any }>()  // Error returned in case of failure
);

// Action for requesting filtered courses
export const requestFilteredCourses = createAction(
  CoursesConstants.REQUEST_FILTERED_COURSES,
  props<{ query: string }>()  // We pass the query string for filtering
);

// Action for successfully fetching filtered courses
export const requestFilteredCoursesSuccess = createAction(
  CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS,
  props<{ courses: Course[] }>()  // We return an array of filtered courses
);

// Action for failure to fetch filtered courses
export const requestFilteredCoursesFail = createAction(
  CoursesConstants.REQUEST_FILTERED_COURSES_FAIL,
  props<{ error: any }>()  // Error returned in case of failure
);

// Action for requesting course deletion
export const requestDeleteCourse = createAction(
  CoursesConstants.REQUEST_DELETE_COURSE,
  props<{ courseId: string }>()  // We pass the courseId as parameter for deletion
);

// Action for successfully deleting a course
export const requestDeleteCourseSuccess = createAction(
  CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS,
  props<{ courseId: string }>()  // We return the courseId that was deleted
);

// Action for failure to delete a course
export const requestDeleteCourseFail = createAction(
  CoursesConstants.REQUEST_DELETE_COURSE_FAIL,
  props<{ error: any }>()  // Error returned in case of failure
);

// Action for requesting course editing
export const requestEditCourse = createAction(
  CoursesConstants.REQUEST_EDIT_COURSE,
  props<{ courseId: string, course: Course }>()  // We pass the courseId and updated course data
);

// Action for successfully editing a course
export const requestEditCourseSuccess = createAction(
  CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS,
  props<{ course: Course }>()  // We return the updated course
);

// Action for failure to edit a course
export const requestEditCourseFail = createAction(
  CoursesConstants.REQUEST_EDIT_COURSE_FAIL,
  props<{ error: any }>()  // Error returned in case of failure
);

// Action for requesting course creation
export const requestCreateCourse = createAction(
  CoursesConstants.REQUEST_CREATE_COURSE,
  props<{ course: Course }>()  // We pass the new course to be created
);

// Action for successfully creating a course
export const requestCreateCourseSuccess = createAction(
  CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS,
  props<{ course: Course }>()  // We return the created course
);

// Action for failure to create a course
export const requestCreateCourseFail = createAction(
  CoursesConstants.REQUEST_CREATE_COURSE_FAIL,
  props<{ error: any }>()  // Error returned in case of failure
);

