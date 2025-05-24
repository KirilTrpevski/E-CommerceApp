import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartService: jest.Mocked<CartService>;

  beforeEach(async () => {
    const cartServiceMock = {
      getCartItems: jest.fn(),
      checkout: jest.fn(),
    } as jest.Mocked<CartService>;

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, CheckoutComponent], // Import the standalone CheckoutComponent
      providers: [{ provide: CartService, useValue: cartServiceMock }],
    }).compileComponents();

    cartService = TestBed.inject(CartService) as jest.Mocked<CartService>;
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cartItems correctly', () => {
    const mockItems = [{ price: 100 }, { price: 200 }];
    cartService.getCartItems.mockReturnValue(mockItems);

    component.ngOnInit();

    expect(component.cartItems.length).toBe(2);
    expect(component.cartItems[0].price).toBe(100);
    expect(component.cartItems[1].price).toBe(200);
  });

  it('should calculate total price correctly', () => {
    component.cartItems = [{ price: 100 }, { price: 200 }];

    const total = component.getTotal();
    expect(total).toBe(300); // 100 + 200
  });

  it('should place the order and show the order message', () => {
    const orderMessage = 'Order placed successfully!';
    cartService.checkout.mockReturnValue(orderMessage);

    component.placeOrder();

    expect(component.orderPlaced).toBe(true);
    expect(component.orderMessage).toBe(orderMessage);
    expect(cartService.checkout).toHaveBeenCalled();
  });
});
