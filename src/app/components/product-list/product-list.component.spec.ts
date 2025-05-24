import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component'; // Import the standalone component
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jest.Mocked<ProductService>;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    // Create mock services
    const productServiceMock = {
      getProducts: jest.fn(),
      trackProductInteraction: jest.fn(),
    } as jest.Mocked<ProductService>;

    const authServiceMock = {
      getUserId: jest.fn(),
    } as jest.Mocked<AuthService>;

    const routerMock = {
      navigate: jest.fn(),
    } as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, RouterTestingModule, ProductListComponent], // Add ProductListComponent here
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    // Get instances of the mocked services
    productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the product detail page when goToProduct is called', () => {
    const productId = '1';
    component.goToProduct(productId);

    expect(router.navigate).toHaveBeenCalledWith([`product/${productId}`]);
  });
});
