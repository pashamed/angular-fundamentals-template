// Add your code here
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducer';  // Import the CoursesState from your reducer

// Select the courses feature state from the store
export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

// Select all courses
export const selectAllCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.courses
);

// Select the loading state for courses
export const selectCoursesLoading = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.loading
);

// Select the error state for courses
export const selectCoursesError = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.error
);

// Select the selected course (for course details)
export const selectSelectedCourse = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.selectedCourse
);

// Select the filtered courses (if any filtering is applied)
export const selectFilteredCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.filteredCourses
);
