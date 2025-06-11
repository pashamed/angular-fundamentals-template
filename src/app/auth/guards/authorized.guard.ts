import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {

    constructor(private authService: AuthService, private router: Router) {}
  
    // CanLoad: Protects lazy-loaded modules or components
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Check if the user is authorized
      if (this.authService.isAuthorised) {
        return true;  // User is authorized, allow access
      } else {
        // User is not authorized, redirect to the login page
        console.log('User not logged in, redirecting to login...');
        return this.router.createUrlTree(['/']);
      }
    }
  }
