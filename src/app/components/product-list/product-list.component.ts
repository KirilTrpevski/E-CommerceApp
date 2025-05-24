import { Component, input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { debounce, debounceTime, filter, map, Observable, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  showHeader = input(true);
  products: Observable<Product[]>;
  searchControl = new FormControl();
  filterFormGroup = new FormGroup({
    electronics: new FormControl(),
    furniture: new FormControl(),
    home: new FormControl(),
    clothing: new FormControl(),
    beauty: new FormControl(),
    sports: new FormControl(),
    accessories: new FormControl(),
    shoes: new FormControl(),
  });

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.products = this.productService.getProducts();
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((searchTerm) => {
      this.products = this.productService
        .getProducts()
        .pipe(
          map((products) =>
            products.filter(
              (product) =>
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
          ),
        );
    });
    this.filterFormGroup.valueChanges.pipe(debounceTime(200)).subscribe((data) => {
      const filteredCategories = Object.keys(data).filter((key) => (data as any)[key]);
      this.products = this.productService.getProducts().pipe(
        map((products) =>
          products.filter((product) => {
            if (filteredCategories.length) {
              console.log(filteredCategories);
              return filteredCategories.includes(product.category.toLowerCase());
            }
            return product;
          }),
        ),
      );
    });
  }

  goToProduct(productId: string): void {
    this.router.navigate([`product/${productId}`]);
    this.trackProductInteraction(productId);
  }

  private trackProductInteraction(productId: string): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.productService.trackProductInteraction(userId!, productId, 'Purchase').subscribe();
    }
  }
}
