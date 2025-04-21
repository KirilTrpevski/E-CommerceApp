import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [MatTableModule, RouterOutlet],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  dataSource: User[] = [];
  displayedColumns: string[] = ['Username', 'Email', 'isAdmin', 'Action'];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.getUsers();
    this.usersService.updatedUser.subscribe((data) => {
      if (data) {
        // console.log(data);
        this.getUsers();
      }
    });
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
    });
  }

  editUser(id: string): void {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}
