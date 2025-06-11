import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @Input() title:string = 'courses-app';


  constructor(private authService: AuthService, private router: Router) {}

  onLoginButtonClick(): void {
    this.router.navigate(["/"]);
  }
  isLoggedIn: boolean = false;
  userName: string = '';  // Holds the username

  

  ngOnInit(): void {
    // Subscribe to the authorization state to track login status
    this.authService.isAuthorized$.subscribe((isAuthorized) => {
      this.isLoggedIn = isAuthorized;
    });

    // Subscribe to the user's name from AuthService
    this.authService.userName$.subscribe((userName) => {
      this.userName = userName;  // Update username value
    });
  }

  // Method to handle logout
  onLogout(): void {
    this.authService.logout(); 
    this.router.navigate(['/']); 
  }
  
}
