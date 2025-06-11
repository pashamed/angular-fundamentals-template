import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}
  
    // CanActivate: Protects routes from authorized users
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Check if the user is authorized
      if (this.authService.isAuthorised) {
        // User is authorized, redirect to courses page or any other page
        return this.router.createUrlTree(['/courses']);
      } else {
        // User is not authorized, allow access to the route (e.g., login page)
        return true;
      }
    }
  }