import { Component, input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  showHeader = input(true);
  products: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.products = this.productService.getProducts();
    // this.getRecommendations();
  }

  goToProduct(productId: string): void {
    this.router.navigate([`product/${productId}`]);
    this.trackProductInteraction(productId);
  }

  private trackProductInteraction(productId: string): void {
    const userId = this.authService.getUserId();
    this.productService.trackProductInteraction(userId!, productId, 'Purchase').subscribe();
  }
}
