import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    service = new CartService();
  });

  it('should create the CartService', () => {
    expect(service).toBeTruthy();
  });

  it('should add items to the cart', () => {
    const product = { id: 1, name: 'Product 1' };

    service.addToCart(product);
    const cartItems = service.getCartItems();

    expect(cartItems.length).toBe(1);
    expect(cartItems[0]).toBe(product);
  });

  it('should get cart items', () => {
    const product1 = { id: 1, name: 'Product 1' };
    const product2 = { id: 2, name: 'Product 2' };

    service.addToCart(product1);
    service.addToCart(product2);

    const cartItems = service.getCartItems();

    expect(cartItems.length).toBe(2);
    expect(cartItems).toEqual([product1, product2]);
  });

  it('should clear the cart', () => {
    const product = { id: 1, name: 'Product 1' };

    service.addToCart(product);
    service.clearCart();

    const cartItems = service.getCartItems();

    expect(cartItems.length).toBe(0);
  });

  it('should checkout and clear the cart', () => {
    const product = { id: 1, name: 'Product 1' };

    service.addToCart(product);

    const message = service.checkout();
    const cartItems = service.getCartItems();

    expect(message).toBe('Order has been placed successfully!');
    expect(cartItems.length).toBe(0);
  });

  it('should remove an item from the cart', () => {
    const product1 = { id: 1, name: 'Product 1' };
    const product2 = { id: 2, name: 'Product 2' };

    service.addToCart(product1);
    service.addToCart(product2);

    service.removeItem(product1);

    const cartItems = service.getCartItems();

    expect(cartItems.length).toBe(1);
    expect(cartItems).toEqual([product2]);
  });

  it('should not remove an item if it is not in the cart', () => {
    const product1 = { id: 1, name: 'Product 1' };
    const product2 = { id: 2, name: 'Product 2' };

    service.addToCart(product1);
    service.removeItem(product2); // Trying to remove a product that's not in the cart

    const cartItems = service.getCartItems();

    expect(cartItems.length).toBe(1);
    expect(cartItems).toEqual([product1]);
  });
});
