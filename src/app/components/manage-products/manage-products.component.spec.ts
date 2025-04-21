import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageProductsComponent } from './manage-products.component';

describe('ManageProducts', () => {
  let component: ManageProductsComponent;
  let fixture: ComponentFixture<ManageProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
