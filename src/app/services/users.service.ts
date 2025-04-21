import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'https://localhost:5001/api/users'; // Mock API

  updatedUser: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  updateUser(payload: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${payload.id}`, {
      UserName: payload.userName,
      IsAdmin: payload.isAdmin,
      Email: payload.email,
    });
  }
}
