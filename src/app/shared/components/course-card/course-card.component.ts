import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { mockedAuthorsList } from '@app/shared/mocks/mock';
import { Router } from '@angular/router';
import { Course,Author } from '@app/types';
import { CoursesService } from '@app/services/courses.service';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course ={}  as Course;
  editIcon = faPencil;
  deleteIcon = faTrashCan;
  @Input() editable: boolean = false;


  @Output() clickOnShow = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  authorsNames: any[] = []; // To hold author names
  isAdmin:boolean = true;
  
  constructor(private coursesService: CoursesService,private authService:AuthService,private router: Router) {}

  ngOnInit(): void {
      // Subscribe to isAdmin$ to get the admin status from AuthService
      this.authService.isAdmin$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin; // Update isAdmin value
        console.log(isAdmin);
        this.editable = this.isAdmin; // Set editable based on isAdmin
      });
    // For each author ID in the course, fetch the author details
    this.getAuthorsNames(this.course.authors)
  }

  // getAuthorsNames(authorIds: string[]): string {
  //   return authorIds.map(id => {
  //     const author = mockedAuthorsList.find(a => a.id === id);
  //     return author ? author.name : 'Unknown Author';
  //   }).join(', ');
  // }
  // constructor(private router: Router) {}


   // Method to fetch author names by their IDs
   getAuthorsNames(authorIds: string[]): void {
    this.coursesService.getAuthorById(authorIds).subscribe(
      (authors: Author[]) => {
        // console.log('API Response:', authors);  // Check what the API returns
        // Check if authors is an array
        this.authorsNames.push(authors)
        // console.log(this.authorsNames);

      },
      (error) => {
        console.error('Error fetching author names:', error);
        this.authorsNames = ['Unknown Author'];  // Fallback if error occurs
      }
    );
  }

  
 
  

  showCourse() {
    // this.clickOnShow.emit(); 
    this.router.navigate(['/course-info', this.course.id]);
  }

  // onEdit(course:Course) {
  //   this.router.navigate([`/courses/edit/${this.course.id}`,{state: { course: course }}]);
    
  // }
  onEdit(course: Course): void {
    // console.log(course);  // Log the course object to make sure it's correct
    this.router.navigate([`/courses/edit/${this.course.id}`], {
      state: { course: course }  // Ensure you pass the course data here
    });
  }

  // onDelete() {
  //   this.delete.emit();
  // }

  onDelete(course:Course): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.deleteCourse(course.id).subscribe(
        (response) => {
          console.log('Course deleted successfully:', response);
           // Emit course ID after deletion
        },
        (error) => {
          console.error('Error deleting course:', error);
        }
      );
    }
  }
}
