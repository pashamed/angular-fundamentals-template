import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mockedAuthorsList } from '@app/shared/mocks/mock';
import { AuthorView } from '@app/shared/models/AuthorView.model';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      newAuthor: this.fb.group({
        author: [
          '',
          [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]*$/)],
        ],
      }),
      authors: this.fb.array<AuthorView>(mockedAuthorsList),
      courseAuthors: this.fb.array<AuthorView>([], Validators.required),
      duration: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get author() {
    return this.courseForm.get('newAuthor.author');
  }

  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors() {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get duration() {
    return this.courseForm.get('duration');
  }

  createAuthor(name: string) {
    if (this.author?.valid) {
      this.authors.push(this.fb.control({ name, id: 'generateRandomId' }));
      this.courseForm.get('newAuthor')?.reset();
    }
  }

  deleteAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  addCourseAuthor(author: AuthorView, index: number): void {
    this.courseAuthors.push(this.fb.control(author));
    this.authors.removeAt(index);
  }

  removeCourseAuthor(index: number): void {
    const author = this.courseAuthors.at(index).value;
    this.authors.push(this.fb.control(author));
    this.courseAuthors.removeAt(index);
  }

  onSubmit(): void {
    this.courseForm.markAllAsTouched();
    console.log('submit');
  }

  onCancel() {
    console.log('cancel');
  }
}
