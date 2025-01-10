import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageMock } from '../mocks/local-storage.mock';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api'; // .NET Core API URL
  private localStorage: Storage | LocalStorageMock;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router,
  ) {
    this.localStorage = isPlatformBrowser(this.platformId) ? localStorage : new LocalStorageMock();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, {
      Username: username,
      Password: password,
    });
  }

  signUp(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/auth/signup`,
      {
        Username: payload.username,
        Email: payload.email,
        Password: payload.password,
      },
      {
        responseType: 'text' as 'json',
      },
    );
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
}
