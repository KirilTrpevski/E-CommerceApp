import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SignUpUser } from '../../models/sign-up.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ReactiveFormsModule, RouterLink],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder, // FormBuilder to create the form
    private authService: AuthService, // Service to handle authentication
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.required]], // Username with validators
      email: ['', [Validators.required, Validators.email]],
      // isAdmin: [''],
      password: ['', [Validators.required]], // Password with validators
      confirmPassword: ['', [Validators.required]], // Password with validators
    });
  }

  submit() {
    const signUpUser: SignUpUser = {
      userName: this.signUpForm.get('username')?.value,
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
      // isAdmin: this.signUpForm.get('isAdmin')?.value,
      isAdmin: true,
    };
    this.authService.signUp(signUpUser).subscribe({
      next: () => {
        console.log('success');
        this.router.navigate(['/login']);
      },
      error: () => {
        console.log('error');
      },
    });
  }
}
