import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@app/auth/services/auth.service";
import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { Author, Course } from "@app/types";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private apiUrl = "http://localhost:4000";

  constructor(private http: HttpClient,private sessionStorageService:SessionStorageService) {}
  getAll(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/courses/all`).pipe(
      map(response => {
        // Check if the response is successful and extract the result array
        if (response.successful) {
          return response.result;  // Return the courses array
        } else {
          return [];  // In case of failure, return an empty array
        }
      })
    );
  }

  // Create a new course
  createCourse(course: Course): Observable<any> {
    console.log(course);
    const token = this.sessionStorageService.getToken();
    // const headers = new HttpHeaders().set("Authorization", `${token}`);
    return this.http.post<any>(`${this.apiUrl}/courses/add`, course);
  }

  // Edit a course
  editCourse(id: string, course: any): Observable<any> {
    // const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<any>(`${this.apiUrl}/courses/${id}`, course);
  }

  // Get a course by ID
  getCourse(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses/${id}`);
  }

  // Delete a course by ID
  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/courses/${id}`);
  }

  // Filter courses by a value (for example, by course name)
  filterCourses(value: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses/filter`, {
      params: { query: value },
    });
  }

  // Get all authors
  getAllAuthors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/authors/all`);
  }

  // Create a new author
  createAuthor(name: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<any>(`${this.apiUrl}/authors/add`, { name }, { headers });
  }

  // Get an author by ID
  getAuthorById(authorIds: string[]): Observable<Author[]> {
    // Construct the API URL for multiple author IDs
    const authorIdsParam = authorIds.join(',');
    return this.http.get<Author[]>(`${this.apiUrl}/authors/${authorIdsParam}`);
  }
}
