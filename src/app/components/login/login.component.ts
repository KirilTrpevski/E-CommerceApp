import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Declare the FormGroup
  isFormValid = false;
  areCredentialsInvalid = false;

  constructor(
    private fb: FormBuilder, // FormBuilder to create the form
    private authService: AuthService, // Service to handle authentication
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Initialize the reactive form with validators
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Username with validators
      password: ['', [Validators.required]], // Password with validators
    });
  }

  onSubmit() {
    console.log(this.loginForm);
  }

  // private checkCredentials(signInForm: NgForm) {
  //   const signInData = new SignInData(signInForm.value.login, signInForm.value.password);
  //   if (!this.authenticationService.authenticate(signInData)) {
  //     this.isFormValid = false;
  //     this.areCredentialsInvalid = true;
  //   }
  // }

  onLogin(): void {
    // if (this.loginForm.invalid) {
    //   return;
    // }
    console.log();

    const formData = this.loginForm.value;
    console.log(formData);
    this.authService.login(formData.username, formData.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.authService.setToken(response.token);
        this.router.navigate(['/products']);
        // Redirect to dashboard or another page upon success
      },
      (error) => {
        console.error('Login failed', error);
        // Handle error (e.g., show an error message)
      },
    );
  }
}
