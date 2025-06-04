import { Component } from '@angular/core';
import {mockedCoursesList} from "@shared/mocks/mocks";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  userName?: string = undefined;

  onAuthAction() {
    if (this.userName) {
      this.userName = undefined; // Logout
    } else {
      this.userName = "Harry Potter"; // Login
    }
  }

    protected readonly mockedCoursesList = mockedCoursesList;
}
