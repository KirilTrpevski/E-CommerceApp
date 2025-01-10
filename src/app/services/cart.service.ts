import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  constructor() {}
  addToCart(product: any) {
    this.cartItems.push(product);
  }
  getCartItems() {
    return this.cartItems;
  }
  clearCart() {
    this.cartItems = [];
  }
  checkout() {
    this.clearCart();
    return 'Order has been placed successfully!';
  }
  removeItem(itemToRemove: any) {
    this.cartItems = this.cartItems.filter((item) => item !== itemToRemove);
  }
}
