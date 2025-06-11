// import { Injectable } from '@angular/core';

// @Injectable({
//     providedIn: 'root'
// })
// export class CoursesStateFacade {
//     // Add your code here
// }

import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  requestAllCourses,
  requestCreateCourse,
  requestDeleteCourse,
  requestEditCourse,
  requestFilteredCourses
} from '@app/store/courses/courses.actions';  // Import actions
import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '@app/store/courses/courses.selectors';  // Import selectors

import { Course } from '@app/types';  // Import the Course type

@Injectable({
  providedIn: 'root'
})
export class CoursesStateFacade {

  constructor(private store: Store) {}

  // Selector: Get all courses
  allCourses$(): Observable<Course[]> {
    return this.store.pipe(select(selectAllCourses));  // Listen for the courses list
  }

  // Selector: Get the loading state of courses
  coursesLoading$(): Observable<boolean> {
    return this.store.pipe(select(selectCoursesLoading));  // Listen for the loading state
  }

  // Selector: Get the error state
  coursesError$(): Observable<any> {
    return this.store.pipe(select(selectCoursesError));  // Listen for errors
  }

  // Dispatch action to load all courses
  loadAllCourses(): void {
    this.store.dispatch(requestAllCourses());  // Dispatch the action to load courses
  }

  // Dispatch action to create a course
  createCourse(course: Course): void {
    this.store.dispatch(requestCreateCourse({ course }));  // Dispatch the action to create a course
  }

  // Dispatch action to delete a course
  deleteCourse(courseId: string): void {
    this.store.dispatch(requestDeleteCourse({ courseId }));  // Dispatch the action to delete a course
  }

  // Dispatch action to edit a course
  editCourse(courseId: string, course: Course): void {
    this.store.dispatch(requestEditCourse({ courseId, course }));  // Dispatch the action to edit a course
  }

  // Dispatch action to filter courses
  filterCourses(query: string): void {
    this.store.dispatch(requestFilteredCourses({ query }));  // Dispatch the action to filter courses
  }
}
