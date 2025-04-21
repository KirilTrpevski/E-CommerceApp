import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SignUpComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminAuthGuard } from './guards/admin-auth-guard';
import { UsersComponent } from './components/users/users.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { UserDetailsResolver } from './resolvers/user-details.resolver';
import { UpdateProductDetailsComponent } from './components/update-product-details/update-product-details.component';
import { ProductDetailsResolver } from './resolvers/product-details.resolver';

export const routes: Routes = [
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'manage-products',
    component: ManageProductsComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: 'add-new-product',
        component: UpdateProductDetailsComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: ':id',
        component: UpdateProductDetailsComponent,
        canActivate: [AdminAuthGuard],
        resolve: { id: ProductDetailsResolver },
      },
    ],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: ':id',
        component: UsersDetailsComponent,
        canActivate: [AdminAuthGuard],
        resolve: { id: UserDetailsResolver },
      },
    ],
  },

  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  { path: 'cart', component: CartComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

  { path: '**', component: PageNotFoundComponent },
];
