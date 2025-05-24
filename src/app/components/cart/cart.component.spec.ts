import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component'; // Standalone component
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jest.Mocked<CartService>;

  beforeEach(async () => {
    const cartServiceMock = {
      getCartItems: jest.fn(),
      removeItem: jest.fn(),
      clearCart: jest.fn(),
    } as jest.Mocked<CartService>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterLink, FormsModule, CartComponent], // Add CartComponent to imports
      providers: [{ provide: CartService, useValue: cartServiceMock }],
    }).compileComponents();

    cartService = TestBed.inject(CartService) as jest.Mocked<CartService>;
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cartItems and set default quantities', () => {
    const mockItems = [{ price: 100 }, { price: 200, quantity: 2 }];
    cartService.getCartItems.mockReturnValue(mockItems);

    component.ngOnInit();

    expect(component.cartItems.length).toBe(2);
    expect(component.cartItems[0].quantity).toBe(1);
    expect(component.cartItems[1].quantity).toBe(2);
    expect(component.cartItems[0].subtotal).toBe(100);
    expect(component.cartItems[1].subtotal).toBe(400);
  });

  it('should calculate total price correctly', () => {
    component.cartItems = [
      { price: 100, quantity: 1 },
      { price: 50, quantity: 3 },
    ];

    const total = component.getTotal();
    expect(total).toBe(250);
  });

  it('should update subtotal for an item', () => {
    const item = { price: 20, quantity: 3 };
    component.updateSubtotal(item);
    expect(item.subtotal).toBe(60);
  });

  it('should remove an item and refresh cart items', () => {
    cartService.getCartItems.mockReturnValue([{ id: 2 }]);

    component.removeItem({ id: 1 });

    expect(cartService.removeItem).toHaveBeenCalledWith({ id: 1 });
    expect(component.cartItems.length).toBe(1);
  });

  it('should clear cart and show alert on checkout', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

    component.onCheckoutClick();

    expect(alertSpy).toHaveBeenCalledWith('Product paid. Enjoy');
    expect(cartService.clearCart).toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
