// import { Injectable } from '@angular/core';

// @Injectable({
//     providedIn: 'root'
// })
// export class AdminGuard {
//     // Add your code here
// }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '../services/user-store.service';
  // Import your user store service

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(
    private userStoreService: UserStoreService,  // Inject UserStoreService to access user role
    private router: Router  // Inject Router to redirect if not an admin
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Get the isAdmin value from the user store service
    if (this.userStoreService.isAdmin) {
      return true; // If the user is an admin, allow access
    } else {
      // If not an admin, redirect to another page (e.g., home or login page)
      this.router.navigate(['/home']);  // You can adjust this to any route you'd like
      return false; // Prevent route activation
    }
  }
}
