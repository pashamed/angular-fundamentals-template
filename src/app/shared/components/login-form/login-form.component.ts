// import { Component, ViewChild } from "@angular/core";
// import { NgForm } from "@angular/forms";

// @Component({
//   selector: "app-login-form",
//   templateUrl: "./login-form.component.html",
//   styleUrls: ["./login-form.component.scss"],
// })
// export class LoginFormComponent {
//   @ViewChild("loginForm") public loginForm!: NgForm;
//   //Use the names `email` and `password` for form controls.
//   public email: string = "";
//   public password: string = "";

//   onSubmit(): void {
//     console.log(this.loginForm.value);
//   }
// }

import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  email: string = '';   // Declare email property
  password: string = ''; // Declare password property

  constructor(private authService: AuthService, private router: Router) {}

  // onSubmit method to handle the form submission
  onSubmit(): void {
    if (this.email && this.password) {
      const loginData = {
        email: this.email,
        password: this.password,
      };

      this.authService.login(loginData).subscribe(
        (isLoggedIn) => {
          console.log(isLoggedIn);
          if (isLoggedIn) {
            this.router.navigate(['/courses']); // Redirect to home page on successful login
          } else {
            console.error('Login failed');
          }
        },
        (error) => {
          console.error('Login error', error); // Handle login error
        }
      );
    } else {
      console.error('Email and password are required');
    }
  }
}

