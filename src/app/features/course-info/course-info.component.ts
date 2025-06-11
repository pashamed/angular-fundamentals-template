import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { Course } from "@app/types";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit{
  // Use the names for the input `course`.
  // @Input() course: {
  //   id:string;
  //   title: string;
  //   description: string;
  //   creationDate: string;
  //   duration: number;
  //   authors: string[];
  // } = {
  //   id:'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
  //   title: 'JavaScript',
  //   description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
  //                   has been the industry's standard dummy text ever since the 1500s, when an unknown
  //                   printer took a galley of type and scrambled it to make a type specimen book. It has survived
  //                   not only five centuries, but also the leap into electronic typesetting, remaining essentially u
  //                   nchanged.`,
  //   creationDate: '08/03/2021',
  //   duration: 160,
  //   authors: ['Vasiliy Dobkin']
  // };
  course: any;
  authorsNames: any[] = []; // To hold author names

  @Input() editable: boolean = false;
  editIcon = faEdit;
  deleteIcon = faTrash;

  constructor(private route: ActivatedRoute,private router: Router, private coursesService: CoursesService) {}

  ngOnInit(): void {
    // Retrieve the course ID from the URL parameters
    const courseId = this.route.snapshot.paramMap.get('id');
    
    if (courseId) {
      this.loadCourse(courseId); 
     
    }
  }

  getAuthorsNames(authorIds: any[]): void {
    console.log(authorIds);
    this.coursesService.getAuthorById(authorIds).subscribe(
      (authors: any[]) => {
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


  loadCourse(courseId: string): void {
   

    this.coursesService.getCourse(courseId).subscribe(
      (response) => {
        this.course = response.result;
        this.getAuthorsNames(this.course.authors)
      },
      (error) => {
        console.error(error);
      }
    );
  }


  goBack() {
    this.router.navigate(["courses"]);
  }
}
