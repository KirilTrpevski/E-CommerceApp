import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule here

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();

    // Ensure each item has a quantity and subtotal
    this.cartItems.forEach((item) => {
      if (!item.quantity) {
        item.quantity = 1; // Set default quantity if not set
      }
      this.updateSubtotal(item); // Calculate initial subtotal
    });
  }

  // Calculate total price for all items
  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Calculate and update the subtotal for each item
  updateSubtotal(item: any) {
    item.subtotal = item.price * item.quantity;
  }

  // Remove an item from the cart
  removeItem(item: any) {
    this.cartService.removeItem(item);
    this.cartItems = this.cartService.getCartItems();
  }

  onCheckoutClick(): void {
    this.router.navigate(['/checkout']);
    // alert('Product paid. Enjoy');
    // this.cartService.clearCart();
  }
}
