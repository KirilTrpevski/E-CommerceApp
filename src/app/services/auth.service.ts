import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageMock } from '../mocks/local-storage.mock';
import { LoginUser } from '../models/login.model';
import { SignUpUser } from '../models/sign-up.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api'; // .NET Core API URL
  private localStorage: Storage | LocalStorageMock;
  private jwtHelper = new JwtHelperService();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router,
  ) {
    this.localStorage = isPlatformBrowser(this.platformId) ? localStorage : new LocalStorageMock();
  }

  login(user: LoginUser): Observable<{ token: string; userId: string }> {
    return this.http.post<{ token: string; userId: string }>(`${this.apiUrl}/auth/login`, {
      Username: user.userName,
      Password: user.password,
    });
  }

  signUp(user: SignUpUser): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/auth/signup`,
      {
        Username: user.userName,
        Email: user.email,
        Password: user.password,
        IsAdmin: user.isAdmin,
      },
      {
        responseType: 'text' as 'json',
      },
    );
  }

  setUserId(userId: string): void {
    this.localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    return this.localStorage.getItem('userId');
  }

  setToken(token: string): void {
    this.localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return this.localStorage.getItem('authToken');
  }

  logout(): void {
    this.localStorage.removeItem('authToken');
    this.router.navigate(['/dashboard']);
  }

  public isAdmin(): boolean {
    const token = this.localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.IsAdmin === 'True'; // Check if the 'IsAdmin' claim is true
    }
    return false;
  }

  public isAuthenticated(): boolean {
    const token = this.localStorage.getItem('authToken');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
}
