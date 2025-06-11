// import { Injectable } from '@angular/core';

// @Injectable({
//     providedIn: 'root'
// })
// export class UserStoreService {

//     getUser() {
//         // Add your code here
//     }

//     get isAdmin() {
//         // Add your code here. Get isAdmin$$ value
//     }

//     set isAdmin(value: boolean) {
//         // Add your code here. Change isAdmin$$ value
//     }
// }


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@app/types'; // Import the User type (replace with your actual User type)
 // Import your user service
import { SessionStorageService } from '@app/auth/services/session-storage.service'; // Assuming session storage for auth
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userSubject = new BehaviorSubject<User | null>(null); // Holds the current user state
  private isAdminSubject = new BehaviorSubject<boolean>(false); // Holds the isAdmin state
  
  // Observable for other components to subscribe to the user data
  public user$ = this.userSubject.asObservable();
  
  // Observable for other components to subscribe to the admin status
  public isAdmin$ = this.isAdminSubject.asObservable();

  constructor(
    private userService: UserService,
    private sessionStorageService: SessionStorageService
  ) {}

  // Fetch user from the API and update the user state
  loadUser(): void {
    const token = this.sessionStorageService.getToken(); // Get token from session storage
    if (token) {
      this.userService.getUser().subscribe(
        (user:User) => {
          this.userSubject.next(user); // Update user in the store
          this.isAdminSubject.next(user.role === 'admin'); // Set isAdmin based on user role
        },
        (error:any) => {
          console.error('Failed to load user data', error);
          this.userSubject.next(null); // If there's an error, set user to null
          this.isAdminSubject.next(false); // Reset isAdmin to false
        }
      );
    } else {
      this.userSubject.next(null); // If no token, set user to null
      this.isAdminSubject.next(false); // Reset isAdmin to false
    }
  }

  // Getter for the isAdmin state
  get isAdmin(): boolean {
    return this.isAdminSubject.getValue();
  }

  // Setter for the isAdmin state
  set isAdmin(value: boolean) {
    this.isAdminSubject.next(value); // Set the isAdmin state
  }

  // Method to clear user data when logging out
  logout(): void {
    this.userSubject.next(null); // Clear user data
    this.isAdminSubject.next(false); // Reset isAdmin
    this.sessionStorageService.deleteToken(); // Optionally remove the token from session storage
  }
}

