import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  cartItems: any[] = [];
  orderPlaced = false;
  orderMessage = '';
  billing = { firstName: '', lastName: '', email: '', address: '', city: '', zip: '' };
  shipping = { address: '', city: '', zip: '' };
  payment = { cardNumber: '', expiry: '', cvv: '' };
  sameAsBilling = true;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  placeOrder() {
    // Here we could add logic to send the order to a backend
    this.orderMessage = this.cartService.checkout();
    this.orderPlaced = true;
  }
}
