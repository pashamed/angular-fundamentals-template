import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CoursesService } from './courses.service';  // Adjust the path to your service
import { catchError, map } from 'rxjs/operators';
import { Course, Author } from '@app/types';  // Ensure you have the correct types

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private coursesSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  private selectedCourseSubject: BehaviorSubject<Course | null> = new BehaviorSubject<Course | null>(null);
  private authorsSubject: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);

  public courses$: Observable<Course[]> = this.coursesSubject.asObservable();
  public selectedCourse$: Observable<Course | null> = this.selectedCourseSubject.asObservable();
  public authors$: Observable<Author[]> = this.authorsSubject.asObservable();

  constructor(private coursesService: CoursesService) {}

  // Get all courses and update the store
  getAll() {
    this.coursesService.getAll().pipe(
      catchError((error) => {
        console.error('Error fetching courses:', error);
        return [];  // Return an empty array in case of error
      })
    ).subscribe((courses) => {
      this.coursesSubject.next(courses);  // Update the courses store
    });
  }

  // Create a new course and update the store (after successful creation)
  createCourse(course: Course) {
    this.coursesService.createCourse(course).pipe(
      catchError((error) => {
        console.error('Error creating course:', error);
        throw error;  // Rethrow or handle error accordingly
      })
    ).subscribe((newCourse) => {
      // Optionally, you can update the store immediately or re-fetch courses
      this.getAll();  // Fetch all courses again or push newCourse into the current list
    });
  }

  // Get a specific course by ID and update the selected course
  getCourse(id: string) {
    this.coursesService.getCourse(id).pipe(
      catchError((error:any) => {
        console.error('Error fetching course:', error);
        return of(null);
      })
    ).subscribe((course) => {
      this.selectedCourseSubject.next(course);  // Update the selected course store
    });
  }

  // Edit a course and update the store (after successful editing)
  editCourse(id: string, course: Course) {
    this.coursesService.editCourse(id, course).pipe(
      catchError((error) => {
        console.error('Error editing course:', error);
        throw error;
      })
    ).subscribe((updatedCourse) => {
      // Optionally, you can update the store immediately or re-fetch courses
      this.getAll();  // Fetch all courses again or update the specific course in the store
    });
  }

  // Delete a course and update the store (after successful deletion)
  deleteCourse(id: string) {
    this.coursesService.deleteCourse(id).pipe(
      catchError((error) => {
        console.error('Error deleting course:', error);
        throw error;
      })
    ).subscribe(() => {
      // After deleting, we can either remove it from the store or re-fetch courses
      this.getAll();  // Re-fetch all courses after deletion
    });
  }

  // Filter courses by a value and update the store
  filterCourses(value: string) {
    this.coursesService.filterCourses(value).pipe(
      catchError((error) => {
        console.error('Error filtering courses:', error);
        return [];
      })
    ).subscribe((filteredCourses) => {
      this.coursesSubject.next(filteredCourses);  // Update the courses store with filtered results
    });
  }

  // Get all authors and update the store
  getAllAuthors() {
    this.coursesService.getAllAuthors().pipe(
      catchError((error) => {
        console.error('Error fetching authors:', error);
        return [];
      })
    ).subscribe((authors) => {
      this.authorsSubject.next(authors);  // Update the authors store
    });
  }

  // Create a new author and optionally update the store
  createAuthor(name: string) {
    this.coursesService.createAuthor(name).pipe(
      catchError((error) => {
        console.error('Error creating author:', error);
        throw error;
      })
    ).subscribe(() => {
      // Optionally, re-fetch all authors
      this.getAllAuthors();
    });
  }

  // Get an author by their ID(s) and update the store
  getAuthorById(authorIds: string[]) {
    this.coursesService.getAuthorById(authorIds).pipe(
      catchError((error) => {
        console.error('Error fetching authors by ID:', error);
        return [];
      })
    ).subscribe((authors) => {
      this.authorsSubject.next(authors);  // Update the authors store with the fetched authors
    });
  }
}
