import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account-management',
  imports: [ReactiveFormsModule],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss',
})
export class AccountManagementComponent implements OnInit {
  userDetailsForm!: FormGroup;
  id!: string;
  userData!: User;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.id = this.authService.getUserId() as string;
    this.getUserData(this.id);
    // this.activatedRoute.data.subscribe((data) => {
    //   this.id = data['id'];
    //   this.getUserData(this.id);
    // });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userDetailsForm = this.fb.group({
      username: ['', [Validators.required, Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      isAdmin: [''],
    });
  }

  updateUser(): void {
    const updateUserPayload: User = {
      id: this.id,
      email: this.userDetailsForm.get('email')?.value,
      userName: this.userDetailsForm.get('username')?.value,
      isAdmin: this.userData.isAdmin,
    };

    this.usersService.updateUser(updateUserPayload).subscribe((updatedUser) => {
      if (updatedUser) {
        this.usersService.updatedUser.next(true);
      }
    });
  }

  populateForm(): void {
    const { userName, email, isAdmin } = { ...this.userData };
    this.userDetailsForm.setValue({
      username: userName,
      email,
      isAdmin,
    });
  }

  getUserData(id: string): void {
    this.usersService.getUser(id).subscribe((user) => {
      this.userData = user;
      this.populateForm();
    });
  }
}
