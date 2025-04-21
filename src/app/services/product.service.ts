import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://localhost:5001/api/products'; // Mock API

  constructor(private http: HttpClient) {}

  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, formData);
  }

  updateProduct(formData: FormData, id: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, formData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  trackProductInteraction(userId: string, productId: string, interactionType: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/product-interaction`, {
      userId: userId,
      productId: productId,
      interactionType: interactionType,
    });
  }

  getRecommendations(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recommendations/${userId}`);
  }
}
