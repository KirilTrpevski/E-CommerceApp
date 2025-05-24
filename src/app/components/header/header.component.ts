import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, MatMenuModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  getToken(): string | null {
    return this.authService.getToken();
  }

  onLogout(): void {
    this.authService.logout();
  }

  onMyAccount(): void {
    this.router.navigate(['/account-management']);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
