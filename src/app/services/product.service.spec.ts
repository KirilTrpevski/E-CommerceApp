import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://localhost:5001/api/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product', () => {
    const dummyProduct = { id: '1', name: 'Test Product' } as Product;
    const formData = new FormData();

    service.addProduct(formData).subscribe((product) => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyProduct);
  });

  it('should update a product', () => {
    const formData = new FormData();
    const id = '123';

    service.updateProduct(formData, id).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true });
  });

  it('should delete a product', () => {
    const id = '123';

    service.deleteProduct(id).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });

  it('should fetch products', () => {
    const products = [{ id: '1', name: 'Product 1' }] as Product[];

    service.getProducts().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(products);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(products);
  });

  it('should fetch a product by ID', () => {
    const product = { id: '1', name: 'Product 1' } as Product;
    const id = '1';

    service.getProductById(id).subscribe((data) => {
      expect(data).toEqual(product);
    });

    const req = httpMock.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(product);
  });

  it('should track product interaction', () => {
    const userId = 'user1';
    const productId = 'product1';
    const interactionType = 'click';

    service.trackProductInteraction(userId, productId, interactionType).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${baseUrl}/product-interaction`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ userId, productId, interactionType });
    req.flush({ success: true });
  });

  it('should fetch recommendations', () => {
    const userId = 'user1';
    const recommendations = [{ id: 'product1' }, { id: 'product2' }];

    service.getRecommendations(userId).subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(recommendations);
    });

    const req = httpMock.expectOne(`${baseUrl}/recommendations/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(recommendations);
  });
});
