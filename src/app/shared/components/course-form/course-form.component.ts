import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { Course } from "@app/types";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faAdd, faTrash, fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  courseId: string = ""; // To store the course ID
  course: Course = {
    id: "",
    title: "",
    description: "",
    authors: [],
    duration: 0,
    creationDate: "",
  };
  isEditMode: boolean = false;

  constructor(
    public fb: FormBuilder,
    private coursesService: CoursesService,
    public library: FaIconLibrary,
    private router: Router
  ) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      author: [
        "",
        [Validators.pattern(/^[a-zA-Z0-9 ]*$/), , Validators.minLength(2)],
      ],
      authors: this.fb.array([], [Validators.required]),
      courseAuthors: this.fb.array([], [Validators.required]),
      duration: [0, [Validators.required, Validators.min(0)]],
    });

    
    const course = history.state.course;
    console.log(course);
    if (course) {
      this.course = course; // Set the course data
      this.isEditMode = true;
      this.setFormValues(course); // Populate the form with the course data
    } else {
      this.isEditMode = false;
      // console.error("No course data found in history state.");
    }
  }

  // Assign the passed course object

  setFormValues(course: Course): void {
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
      duration: course.duration,
    });

    // Add authors to the authors FormArray
    this.addAuthor();
  }

  getAuthors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  getCourseAuthors(): FormArray {
    return this.courseForm.get("courseAuthors") as FormArray;
  }

  // addAuthor() {
  //   const authorName = this.courseForm.get("author")?.value;
  //   if (authorName) {
  //     // Call the API to create the author
  //     this.coursesService.createAuthor(authorName).subscribe(
  //       (response) => {
  //         const authorId = response.result.id;  // Get the author ID from the response
  //         const createdAuthorName = response.result.name;  // Get the author name from the response

  //         // Ensure author ID and name are valid before adding
  //         if (authorId && createdAuthorName) {
  //           // Add the author name to the 'authors' list (for displaying)
  //           this.getAuthors().push(this.fb.control(createdAuthorName));

  //           // Add the author ID to the 'courseAuthors' list (for sending in the API request)
  //           this.getCourseAuthors().push(this.fb.control(authorId));

  //           // Reset the input field for the next author name
  //           this.courseForm.get("author")?.reset();
  //         } else {
  //           console.error('Received invalid author ID or name');
  //         }
  //       },
  //       (error) => {
  //         console.error("Error creating author:", error);
  //       }
  //     );
  //   } else {
  //     console.error('No author name provided');
  //   }
  // }

  addAuthor() {
    const authorName = this.courseForm.get("author")?.value;
    if (authorName) {
      // Call the API to create the author
      this.coursesService.createAuthor(authorName).subscribe(
        (response) => {
          const authorId = response.result.id; // Get the author ID from the response
          const createdAuthorName = response.result.name; // Get the author name from the response

          // Ensure author ID and name are valid before adding
          if (authorId && createdAuthorName) {
            // Add the author name to the 'authors' list (for displaying)
            this.getAuthors().push(this.fb.control(createdAuthorName));

            // Reset the input field for the next author name
            this.courseForm.get("author")?.reset();
          } else {
            console.error("Received invalid author ID or name");
          }
        },
        (error) => {
          console.error("Error creating author:", error);
        }
      );
    } else {
      console.error("No author name provided");
    }
  }

  // addCourseAuthor(index: number) {
  //   const authorsArray = this.getAuthors();
  //   const courseAuthorsArray = this.getCourseAuthors();

  //   const author = authorsArray.at(index).value;
  //   courseAuthorsArray.push(this.fb.control(author));
  // }
  // addCourseAuthor(index: number) {
  //   const authorsArray = this.getAuthors();
  //   const courseAuthorsArray = this.getCourseAuthors();

  //   const authorName = authorsArray.at(index).value;

  //   // Find the corresponding author ID in the course authors list (we assume it's a function to get the ID for the name)
  //   const authorId = this.getAuthorIdByName(authorName);

  //   if (authorId) {
  //     // Add the author ID to the courseAuthors list
  //     courseAuthorsArray.push(this.fb.control(authorId));

  //     // Remove the author from the authors list
  //     authorsArray.removeAt(index);
  //   }
  // }
  addCourseAuthor(index: number) {
    const authorsArray = this.getAuthors();
    const courseAuthorsArray = this.getCourseAuthors();
    

    // Check if the index is valid and if authorsArray has a value at the index
    const authorControl = authorsArray.at(index);
    console.log(authorControl);
    if (!authorControl) {
      console.error("Invalid index or author does not exist in authors array.");
      return;
    }

    const authorName = authorControl.value;
    // console.log(authorName);

    // Ensure that authorName is defined before proceeding
    if (!authorName) {
      console.error("Author name is undefined or empty.");
      return;
    }
    // const newAuthorControl = this.fb.control(authorName);
    // console.log(newAuthorControl);
    courseAuthorsArray.push(this.fb.control(authorName));
    // console.log(courseAuthorsArray.value);

    // Optionally, remove from authors array
    authorsArray.removeAt(index);

    // Find the corresponding author ID using the name
    // const authorId = this.getAuthorIdByName(authorName);
    // console.log(authorId);
    // // If the author ID is found, add it to the courseAuthors FormArray
    // if (authorId) {
    //   courseAuthorsArray.push(this.fb.control(authorId));
    //   console.log(courseAuthorsArray);

    //   // Remove the author from the authors list
    //   authorsArray.removeAt(index);
    // } else {
    //   console.error("Author ID not found for name:", authorName);
    // }
  }

  // removeAuthor(index: number) {
  //   (this.courseForm.get("courseAuthors") as FormArray).removeAt(index);
  // }
  // removeAuthor(index: number) {
  //   const courseAuthorsArray = this.getCourseAuthors();
  //   const authorsArray = this.getAuthors();

  //   // Get the author ID from courseAuthors list
  //   const authorId = courseAuthorsArray.at(index).value;

  //   // Add the author name back to the authors list
  //   const authorName = this.getAuthorNameById(authorId);
  //   authorsArray.push(this.fb.control(authorName));

  //   // Remove the author from courseAuthors list
  //   courseAuthorsArray.removeAt(index);
  // }

  removeAuthor(index: number) {
    const courseAuthorsArray = this.getCourseAuthors();
    const authorsArray = this.getAuthors();

    // Get the author ID from courseAuthors list
    const authorId = courseAuthorsArray.at(index).value;

    // Add the author name back to the authors list
    const authorName = this.getAuthorNameById(authorId);
    authorsArray.push(this.fb.control(authorName));

    // Remove the author from courseAuthors list
    courseAuthorsArray.removeAt(index);
  }

  getAuthorIdByName(name: string): string {
    const authorsArray = this.getAuthors();
    console.log(authorsArray.controls[0].value);
    for (let i = 0; i < authorsArray.controls.length; i++) {
      if (authorsArray.controls.at(i)?.value === name) {
        return this.getCourseAuthors().at(i)?.value || null; // Safely access value
      }
    }
    return "";
  }

  // Helper function to get the author name by ID
  // getAuthorNameById(id: string): string {
  //   // Find the author name from the authors array based on ID
  //   const authorsArray = this.getAuthors();
  //   for (let i = 0; i < authorsArray.length; i++) {
  //     if (this.getCourseAuthors().at(i).value === id) {
  //       return authorsArray.at(i).value; // Return the author name
  //     }
  //   }
  //   return "hkvkkuk";
  // }
  getAuthorNameById(id: string): string {
    const authorsArray = this.getCourseAuthors();
    // console.log(authorsArray);

    // Loop through the authors array to find the name corresponding to the ID
    for (let i = 0; i < authorsArray.length; i++) {
      const authorName = authorsArray.at(i).value;
      const authorId = this.getCourseAuthors().at(i).value;

      if (authorId === id) {
        return authorName; // Return the author name when IDs match
      }
    }

    // Default fallback if no author name is found
    return "Unknown Author";
  }

  onSubmit(): void {
    console.log(this.courseForm.value);
    const formValues = this.courseForm.value;

    const authorNames = formValues.courseAuthors;
    console.log(authorNames);
    let authorIds;

    this.coursesService.getAllAuthors().subscribe(
      (authorsResponse: any) => {
        // Assuming authorsResponse is an array of author objects with `id` and `name`
        console.log('Authors from API:', authorsResponse);
  
        // Create a mapping from author name to author id
        const authorMap = authorsResponse.result?.reduce((map: any, author: any) => {
          map[author.name] = author.id;
          return map;
        }, {});

        console.log(authorMap)
  
        // Map the author names to their corresponding ids
        authorIds = authorNames?.map((name: string) => authorMap[name])?.filter((id: any) => id !== null);
  
        console.log('Mapped Author IDs:', authorIds);
      }
      )
    // Prepare the updated course data
    const updatedCourse: Course = {
      id: "brvbervbr87wrbvbwu4r", // Keep the course ID for updating
      title: formValues.title,
      description: formValues.description,
      authors: authorIds||[], // Authors from the form
      duration: formValues.duration,
      // creationDate: "14/Sep/2024", // Keep the original creation date
    };

    console.log(updatedCourse);
    // this.coursesService.editCourse(this.course.id, updatedCourse).subscribe(
    //   (response) => {
    //     console.log("Course updated successfully:", response);
    //     this.router.navigate(["/courses"]); // Redirect to courses list
    //   },
    //   (error) => {
    //     console.error("Error updating course:", error);
    //   }
    // );
    // Check if we are editing or creating a new course
    if (this.course.id) {
      // Editing an existing course (PUT request)
      console.log("Updating course with ID:", this.course.id);
      this.coursesService.editCourse(this.course.id, updatedCourse).subscribe(
        (response) => {
          console.log("Course updated successfully:", response);
          this.router.navigate(["/courses"]); // Redirect to the courses list after update
        },
        (error) => {
          console.error("Error updating course:", error);
        }
      );
    } else {
      // Creating a new course (POST request)
      console.log("Creating a new course");
      this.coursesService.createCourse(updatedCourse).subscribe(
        (response) => {
          console.log("Course created successfully:", response);
          this.router.navigate(["/courses"]); // Redirect to courses list after creation
        },
        (error) => {
          console.error("Error creating course:", error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(["/courses"]);
  }

  deleteIcon = faTrash;
  addIcon = faAdd;
}
