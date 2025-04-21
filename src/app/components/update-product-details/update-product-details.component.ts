import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product-details',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-product-details.component.html',
  styleUrl: './update-product-details.component.scss',
})
export class UpdateProductDetailsComponent implements OnInit {
  productData!: Product;
  productDetailsForm!: FormGroup;
  id!: string;
  isEditMode!: boolean;
  image: File | null = null;

  constructor(
    private productsService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getRouteData();
    this.initForm();
  }

  initForm(): void {
    this.productDetailsForm = this.fb.group({
      price: [null, Validators.required],
      name: ['', Validators.required],
      image: [null, Validators.required],
      description: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
    });
  }

  populateForm(): void {
    const { price, name, description, stock, category } = { ...this.productData };
    this.productDetailsForm.patchValue({
      price,
      name,
      description,
      category,
      stock,
    });
  }

  getProductData(id: string): void {
    this.productsService.getProductById(id).subscribe((product) => {
      this.productData = product;
      if (this.isEditMode) {
        this.populateForm();
      }
    });
  }

  onImageChange(event: any): void {
    this.image = event.target.files[0];
  }

  submit(): void {
    const formData: FormData = new FormData();
    if (this.productDetailsForm) {
      formData.append('name', this.productDetailsForm.get('name')?.value);
      formData.append('description', this.productDetailsForm.get('description')?.value);
      formData.append('price', this.productDetailsForm.get('price')?.value);
      formData.append('category', this.productDetailsForm.get('category')?.value);
      formData.append('stock', this.productDetailsForm.get('stock')?.value);
      if (this.image instanceof File) {
        formData.append('image', this.image);
      }

      if (this.isEditMode) {
        this.productsService.updateProduct(formData, this.id).subscribe({
          next: () => {
            this.router.navigate([`manage-products`]);
          },
        });
      } else {
        this.productsService.addProduct(formData).subscribe({
          next: () => {
            this.router.navigate([`manage-products`]);
          },
        });
      }
    }
  }

  deleteProduct(): void {
    this.productsService.deleteProduct(this.id).subscribe({
      next: () => {
        this.router.navigate([`manage-products`]);
      },
    });
  }

  private getRouteData() {
    const data = this.activatedRoute.data;
    const params = this.activatedRoute.queryParams;

    combineLatest([data, params]).subscribe(([routeData, routeQueries]) => {
      this.id = routeData['id'];
      this.isEditMode = routeQueries['isEditMode'] === 'true' ? true : false;
      if (this.isEditMode) {
        this.getProductData(this.id);
      }
    });
  }
}
