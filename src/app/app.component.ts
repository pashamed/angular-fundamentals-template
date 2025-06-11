import { Component } from '@angular/core';
import { mockedAuthorsList, mockedCoursesList } from './shared/mocks/mock';
import { CourseView } from './shared/models/courseView.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'courses-app';
  // header
  buttonText = 'Log out';
  userName = 'User';

  // courses
  editable = false;
  courses: CourseView[] = mockedCoursesList.map((course) => ({
    ...course,
    creationDate: new Date(course.creationDate),
    authors: course.authors.map(
      (authorId) =>
        mockedAuthorsList.find(({ id }) => id === authorId)?.name || ''
    ),
  }));

  showCourse(id: string): void {
    console.log('show', id);
  }

  editCourse(id: string): void {
    console.log('edit', id);
  }

  deleteCourse(id: string): void {
    console.log('delete', id);
  }
}
