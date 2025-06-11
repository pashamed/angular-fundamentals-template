import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import emailValidator from "@app/shared/utils/emailValidator";


@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  loading: boolean = false; // For handling loading state
  errorMessage: string = ''; // For error messages

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject HttpClient
    private router: Router // Inject Router for redirection after successful registration
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, emailValidator]],
      password: ["", Validators.required],
    });
  }

  // onSubmit(): void {
  //   console.log(this.registrationForm.value);
  // }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return; // Don't proceed if form is invalid
    }

    // Disable the form to prevent multiple submissions
    this.loading = true;
    this.errorMessage = ''; // Reset error message

    // Send the form data to the backend
    const { name, email, password } = this.registrationForm.value;
    const payload = { name, email, password };

    // Use AuthService for registration
    this.authService.register(payload).subscribe({
      next: (isRegistered) => {
        if (isRegistered) {
          // console.log('Registration successful');
          this.router.navigate(['/']); 
        } else {
          this.errorMessage = 'Registration failed. Please try again later.';
        }
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed. Please try again later.';
      },
      complete: () => {
        this.loading = false; // Hide the loading indicator
      }
    });
  }
}

