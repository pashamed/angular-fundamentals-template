// import { Injectable } from '@angular/core';

// @Injectable({
//     providedIn: 'root'
// })
// export class UserService {
//     getUser() {
//         // Add your code here
//     }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/types';  // Assuming your User type is defined in @app/types
import { SessionStorageService } from '@app/auth/services/session-storage.service'; // Assuming you have a session storage service

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4000'; // Replace with your actual backend URL

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService  // Inject the session storage service to get the token
  ) {}

  // Fetch user details from the API
  getUser(): Observable<User> {
    const token = this.sessionStorageService.getToken();  // Retrieve the token from session storage
    if (!token) {
      throw new Error('No token found');
    }

    const headers = {
      Authorization: `Bearer ${token}`,  // Add Authorization header with the token
    };

    // Send GET request to backend API to get user details
    return this.http.get<User>(`${this.apiUrl}/users/me`, { headers });
  }
}
