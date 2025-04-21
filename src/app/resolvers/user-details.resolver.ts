import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsResolver implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const userId = route.paramMap.get('id');
    return of(userId);
  }
}
