import { Component, Input } from '@angular/core';
import { CourseView } from '@app/shared/models/courseView.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() title: CourseView['title'] = '';
  @Input() description: CourseView['description'] = '';
  @Input() creationDate: CourseView['creationDate'] = new Date(0);
  @Input() duration: CourseView['duration'] = 0;
  @Input() authors: CourseView['authors'] = [];
}
