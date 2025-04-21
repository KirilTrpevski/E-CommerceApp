import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginUser } from '../../models/login.model';

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
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.loginForm);
  }

  onLogin(): void {
    const formData = this.loginForm.value;
    const loginUser: LoginUser = {
      userName: formData.username,
      password: formData.password,
    };
    this.authService.login(loginUser).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.authService.setUserId(response.userId);
        if (this.authService.isAdmin()) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/products']);
        }

        // Redirect to dashboard or another page upon success
      },
      (error) => {
        console.error('Login failed', error);
        // Handle error (e.g., show an error message)
      },
    );
  }
}
