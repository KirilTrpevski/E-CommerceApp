import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-details',
  imports: [ReactiveFormsModule],
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.scss',
})
export class UsersDetailsComponent implements OnInit {
  userData!: User;
  userDetailsForm!: FormGroup;
  id!: string;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.id = data['id'];
      this.getUserData(this.id);
    });
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

  updateUser(): void {
    const updateUserPayload: User = {
      id: this.id,
      email: this.userDetailsForm.get('email')?.value,
      userName: this.userDetailsForm.get('username')?.value,
      isAdmin: this.userDetailsForm.get('isAdmin')?.value,
    };

    this.usersService.updateUser(updateUserPayload).subscribe((updatedUser) => {
      if (updatedUser) {
        this.usersService.updatedUser.next(true);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
