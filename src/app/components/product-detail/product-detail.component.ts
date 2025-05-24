import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  product: Product | undefined;
  responsiveOptions: any[] | undefined;

  recommendedProducts: Product[] = [];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.getRecommendations();
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const id = data['id'];
      this.productService.getProductById(id).subscribe((data) => {
        this.product = data;
      });
    });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    if (product) {
      alert(`${product.name} has been added to the cart!`);
    }
  }

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

  goToProduct(productId: string): void {
    this.router.navigateByUrl(`product/${productId}`);
    this.trackProductInteraction(productId);
  }

  private trackProductInteraction(productId: string): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.productService.trackProductInteraction(userId!, productId, 'Purchase').subscribe();
    }
  }

  private getRecommendations(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.productService.getRecommendations(userId).subscribe((data) => {
        this.recommendedProducts = data.splice(0, 8);
      });
    }
  }
}
