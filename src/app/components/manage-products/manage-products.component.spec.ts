import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageProductsComponent } from './manage-products.component';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { TruncatePipe } from '../../pipes/truncate.pipe';

describe('ManageProductsComponent', () => {
  let component: ManageProductsComponent;
  let fixture: ComponentFixture<ManageProductsComponent>;
  let productService: jest.Mocked<ProductService>;
  let router: jest.Mocked<Router>;
  let route: jest.Mocked<ActivatedRoute>;

  beforeEach(async () => {
    // Create mock service
    const productServiceMock = {
      getProducts: jest.fn(),
    } as jest.Mocked<ProductService>;

    const routerMock = {
      navigate: jest.fn(),
    } as jest.Mocked<Router>;

    const activatedRouteMock = {
      queryParams: of({}),
    } as jest.Mocked<ActivatedRoute>;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTableModule,
        RouterTestingModule,
        TruncatePipe,
        ManageProductsComponent, // Add the standalone component here
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    // Get instances of mocked services
    productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    route = TestBed.inject(ActivatedRoute) as jest.Mocked<ActivatedRoute>;
    fixture = TestBed.createComponent(ManageProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on ngOnInit', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Product 1',
        price: 100,
        description: 'Description 1',
        category: 'Category 1',
        imageUrl: 'url1',
      },
      {
        id: '2',
        title: 'Product 2',
        price: 200,
        description: 'Description 2',
        category: 'Category 2',
        imageUrl: 'url2',
      },
    ];

    // Mock the getProducts method to return the mock data
    productService.getProducts.mockReturnValue(of(mockProducts));

    component.ngOnInit(); // Call ngOnInit to trigger getProducts

    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.dataSource).toEqual(mockProducts); // Check if the dataSource is populated with mock data
  });

  it('should call router.navigate when editProduct is called', () => {
    const productId = '1';
    component.editProduct(productId);

    expect(router.navigate).toHaveBeenCalledWith([productId], {
      relativeTo: route,
      queryParams: { isEditMode: true },
    });
  });

  it('should navigate to add product page when addProduct is called', () => {
    component.addProduct();

    expect(router.navigate).toHaveBeenCalledWith(['/manage-products/add-new-product'], {
      queryParams: { isEditMode: false },
    });
  });

  it('should navigate to /manage-products when closePreview is called', () => {
    component.closePreview();

    expect(router.navigate).toHaveBeenCalledWith(['/manage-products']);
  });
});
