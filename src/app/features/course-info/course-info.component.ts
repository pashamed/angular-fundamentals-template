import { Component, Input } from '@angular/core';
import { CourseView } from '@app/shared/models/courseView.model';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})
export class CourseInfoComponent {
  @Input() course: CourseView = {
    id: '',
    title: '',
    description: '',
    creationDate: new Date(0),
    duration: 0,
    authors: [],
  };
}
