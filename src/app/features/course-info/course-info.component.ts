import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  @Input() course!: {
    id: string;
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
    authors: string[];
  }

  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
}
