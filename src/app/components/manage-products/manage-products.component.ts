import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-products',
  imports: [MatTableModule, RouterOutlet, TruncatePipe, CommonModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss',
})
export class ManageProductsComponent implements OnInit {
  dataSource: Product[] = [];
  displayedColumns: string[] = ['Image', 'Price', 'Name', 'Description', 'Category', 'Actions'];
  isEditMode = false;

  constructor(
    private productsService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.route.queryParams.subscribe((data) => {
      this.isEditMode = data['isEditMode'];
    });
  }

  editProduct(id: string): void {
    this.router.navigate([`${id}`], { relativeTo: this.route, queryParams: { isEditMode: true } });
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
    });
  }

  addProduct(): void {
    this.router.navigate([`/manage-products/add-new-product`], {
      queryParams: { isEditMode: false },
    });
  }

  closePreview(): void {
    this.router.navigate([`/manage-products`]);
  }
}
