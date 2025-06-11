import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//     // Add your code here
// }

export class TokenInterceptor implements HttpInterceptor {

    constructor(private sessionStorageService: SessionStorageService) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Get the token from AuthService or sessionStorage
      const token = this.sessionStorageService.getToken();  // You can get the token from the sessionStorage or the AuthService
        
      // If there's a token, clone the request and add the Authorization header
      if (token) {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `${token}`,
          },
        });
  
        // Pass the cloned request to the next handler
        return next.handle(clonedRequest);
      }
  
      // If no token, proceed with the original request
      return next.handle(req);
    }
  }
