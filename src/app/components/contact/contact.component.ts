import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: 'contact.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class ContactComponent {
  contactedApp = false;
  contactMessage = '';

  sendForm(): void {
    this.contactedApp = true;
    this.contactMessage =
      'Thanks for your feedback. We will get back to you as soon as we can. \n Thanks for understanding and have a nice shopping!!';
  }
}
