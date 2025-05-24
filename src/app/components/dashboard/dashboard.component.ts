import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: 'dashboard.component.scss',
  standalone: true,
  imports: [NgbCarouselModule, FormsModule, ProductListComponent],
})
export class DashboardComponent {
  // images = [1, 2, 3, 4].map((n) => `../../../assets/image${n}.jpg`);
  images = [
    {
      image: 1,
      description: 'New Season, New Styles!',
      subDescription: 'Check Out Our Latest Arrivals!',
    },
    {
      image: 2,
      description: 'Male? Female? Get unisex clothes',
      subDescription: 'Get the best unisex clothes at our store!',
    },
    {
      image: 3,
      description: 'Big Discounts on Guitars!',
      subDescription: "Don't Miss Our Guitar Deals!",
    },
    {
      image: 4,
      description: 'Spring jackets, Best Prices!',
      subDescription: 'Check out our new collection!',
    },
  ].map((item, index) => {
    return { ...item, image: `../../../assets/image${index + 1}.jpg` };
  });

  // images = [
  //   'https://www.fashiongroup.com.mk/files/images/2025/4/1/WEB%20banner.jpg.webp',
  //   'https://www.fashiongroup.com.mk/files/images/2025/3/26/STL%20web%20baner%20(1).jpg.webp',
  // ];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
