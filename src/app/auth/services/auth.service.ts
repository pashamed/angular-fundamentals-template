import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';

interface AuthResponse {
    successful: boolean;
    result: string; // The token
    user: {
      name: string;  // User's name
      email: string; // User's email
    };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();
  private userName$$ = new BehaviorSubject<string>(this.getUserNameFromStorage());
  public userName$: Observable<string> = this.userName$$.asObservable();
  
  private isAdmin$$ = new BehaviorSubject<boolean>(this.isAdmin());
  public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  private authUrl = 'http://localhost:4000';  

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  // Login method: Sends credentials to the backend and stores the result
  login(user: { email: string; password: string }): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, user).pipe(
      map((response) => {
        if (response.result) {
            console.log('Login success, result:', response.result);
          this.sessionStorageService.setToken(response.result);
          this.isAuthorized$$.next(true); 
          const userEmail = response.user.email;
          const userName = response.user.name;
          this.userName$$.next(userName !== null ? userName : '');

          sessionStorage.setItem('userName', userName);

           // Check if the user is an admin
           if (userEmail === 'admin@email.com') {
            this.isAdmin$$.next(true);  // Set isAdmin to true for admin users
            sessionStorage.setItem('isAdmin', 'true');
          } else {
            this.isAdmin$$.next(false); // Regular user
            sessionStorage.setItem('isAdmin', 'false');
          }
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login failed', error);
        this.isAuthorized$$.next(false); 
        return [false];
      })
    );
  }

  // Register method: Sends user data to the backend to create a new account
  register(user: { name: string; email: string; password: string }): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.authUrl}/register`, user).pipe(
      map((response) => {
        if (response.result) {
          this.sessionStorageService.setToken(response.result); // Store the result
          this.isAuthorized$$.next(true); // Update the authorization state
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Registration failed', error);
        this.isAuthorized$$.next(false);
        return [false];
      })
    );
  }

  // Logout method: Removes the result and updates the authorization state
  logout(): void {
    this.sessionStorageService.deleteToken(); // Remove result from session storage
    this.isAuthorized$$.next(false); // Update the authorization state
    this.isAdmin$$.next(false);
    sessionStorage.removeItem('isAdmin');
  }

  // Check if the user is logged in
  private isLoggedIn(): boolean {
    console.log('Checking token in sessionStorage:', this.sessionStorageService.getToken());
    // console.log(this.sessionStorageService.getToken());
    return !!this.sessionStorageService.getToken();  // Return true if result exists
  }

  // Getter for isAuthorized (using BehaviorSubject's value)
  get isAuthorised(): boolean {
    // console.log(this.isAuthorized$$.value);
    console.log('isAuthorized$$ value:', this.isAuthorized$$.value);
    return this.isAuthorized$$.value;
  }

  // Setter for isAuthorized (updates the BehaviorSubject's value)
  set isAuthorised(value: boolean) {
    console.log('Setting isAuthorized$$ value to:', value);
    this.isAuthorized$$.next(value);
  }

  private  isAdmin(): boolean {
    const storedAdminStatus = sessionStorage.getItem('isAdmin');
    return storedAdminStatus === 'true';
  }

  private getUserNameFromStorage(): string {
    const storedUserName = sessionStorage.getItem('userName');
    return storedUserName ? storedUserName : ''; // Return username from sessionStorage if available
  }

  get isAdminStatus(): boolean {
    return this.isAdmin$$.value;
  }

  get userName(): string {
    return this.userName$$.value;
  }

  // Get the login URL (can be used for redirects)
  getLoginUrl(): string {
    return `${this.authUrl}/login`; // Adjust this URL as needed
  }
}
