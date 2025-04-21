import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsResolver implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const productId = route.paramMap.get('id');
    return of(productId);
  }
}
