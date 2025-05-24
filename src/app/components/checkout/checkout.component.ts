import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-checkout',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
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
  checkoutForm!: FormGroup; // Declare the FormGroup
  billingForm!: FormGroup; // Declare the FormGroup

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.checkoutForm = this.fb.group({
      cardNumber: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
    });

    this.billingForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    });
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  placeOrder() {
    // Here we could add logic to send the order to a backend
    this.orderMessage = this.cartService.checkout();
    this.orderPlaced = true;
  }

  isFormValid(): boolean {
    return this.checkoutForm.valid && this.billingForm.valid && !!this.cartItems.length;
  }
}
