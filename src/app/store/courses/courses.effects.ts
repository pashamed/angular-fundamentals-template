// import { Injectable } from '@angular/core';

// @Injectable()
// export class CoursesEffects {
//     constructor() {}

//     // Add your code here
// }

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CoursesService } from '@app/services/courses.service';  // Import the CoursesService
import {
  requestAllCourses,
  requestAllCoursesSuccess,
  requestAllCoursesFail,
  requestSingleCourse,
  requestSingleCourseSuccess,
  requestSingleCourseFail,
  requestFilteredCourses,
  requestFilteredCoursesSuccess,
  requestFilteredCoursesFail,
  requestDeleteCourse,
  requestDeleteCourseSuccess,
  requestDeleteCourseFail,
  requestEditCourse,
  requestEditCourseSuccess,
  requestEditCourseFail,
  requestCreateCourse,
  requestCreateCourseSuccess,
  requestCreateCourseFail
} from '@app/store/courses/courses.actions';  // Import the actions

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService  // Injecting CoursesService to make API calls
  ) {}

  // Effect to load all courses
  loadAllCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAllCourses),  // Triggered when the requestAllCourses action is dispatched
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map(courses => requestAllCoursesSuccess({ courses })),  // Dispatch success action with fetched courses
          catchError(error => of(requestAllCoursesFail({ error })))  // Dispatch failure action in case of error
        )
      )
    )
  );

  // Effect to load a single course
  loadSingleCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestSingleCourse),  // Triggered when the requestSingleCourse action is dispatched
      switchMap(action =>
        this.coursesService.getCourse(action.courseId).pipe(
          map(course => requestSingleCourseSuccess({ course })),  // Dispatch success action with fetched course
          catchError(error => of(requestSingleCourseFail({ error })))  // Dispatch failure action in case of error
        )
      )
    )
  );

  // Effect to load filtered courses based on search query
  loadFilteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestFilteredCourses),  // Triggered when the requestFilteredCourses action is dispatched
      switchMap(action =>
        this.coursesService.filterCourses(action.query).pipe(
          map(courses => requestFilteredCoursesSuccess({ courses })),  // Dispatch success action with filtered courses
          catchError(error => of(requestFilteredCoursesFail({ error })))  // Dispatch failure action in case of error
        )
      )
    )
  );

  // Effect to delete a course
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestDeleteCourse),  // Triggered when the requestDeleteCourse action is dispatched
      switchMap(action =>
        this.coursesService.deleteCourse(action.courseId).pipe(
          map(() => requestDeleteCourseSuccess({ courseId: action.courseId })),  // Dispatch success action with deleted courseId
          catchError(error => of(requestDeleteCourseFail({ error })))  // Dispatch failure action in case of error
        )
      )
    )
  );

  // Effect to edit a course
  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestEditCourse),  // Triggered when the requestEditCourse action is dispatched
      switchMap(action =>
        this.coursesService.editCourse(action.courseId, action.course).pipe(
          map(course => requestEditCourseSuccess({ course })),  // Dispatch success action with updated course
          catchError(error => of(requestEditCourseFail({ error })))  // Dispatch failure action in case of error
        )
      )
    )
  );

  // Effect to create a new course
  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestCreateCourse),  // Triggered when the requestCreateCourse action is dispatched
      switchMap(action =>
        this.coursesService.createCourse(action.course).pipe(
          map(course => requestCreateCourseSuccess({ course })),  // Dispatch success action with created course
          catchError(error => of(requestCreateCourseFail({ error })))  // Dispatch failure action in case of error
        )
      )
    )
  );
}
