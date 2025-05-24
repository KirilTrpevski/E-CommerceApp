import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;
  let activatedRoute: jest.Mocked<ActivatedRoute>;

  beforeEach(async () => {
    const authServiceMock = {
      login: jest.fn(),
      setToken: jest.fn(),
      setUserId: jest.fn(),
      isAdmin: jest.fn(),
    } as jest.Mocked<AuthService>;

    const routerMock = {
      navigate: jest.fn(),
    } as jest.Mocked<Router>;

    const activatedRouteMock = {
      snapshot: {
        queryParams: {},
      },
    } as jest.Mocked<ActivatedRoute>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jest.Mocked<ActivatedRoute>;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  //   it('should create the component', () => {
  //     expect(component).toBeTruthy();
  //   });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.controls['username'].value).toBe('');
    expect(component.loginForm.controls['password'].value).toBe('');
  });

  it('should call onSubmit() and log form values', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.loginForm.setValue({ username: 'test', password: 'test123' });
    component.onSubmit();
    expect(consoleSpy).toHaveBeenCalledWith(component.loginForm);
    consoleSpy.mockRestore();
  });

  it('should call onLogin() and navigate to dashboard for admin', () => {
    const loginResponse = { token: 'token123', userId: 'user123' };
    authService.login.mockReturnValue(of(loginResponse)); // Mocking successful login
    authService.isAdmin.mockReturnValue(true); // Admin user

    component.loginForm.setValue({ username: 'admin', password: 'admin123' });
    component.onLogin();

    expect(authService.login).toHaveBeenCalledWith({
      userName: 'admin',
      password: 'admin123',
    });
    expect(authService.setToken).toHaveBeenCalledWith('token123');
    expect(authService.setUserId).toHaveBeenCalledWith('user123');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login failure and not navigate', () => {
    const errorResponse = new Error('Login failed');
    authService.login.mockReturnValue(throwError(() => errorResponse)); // Mocking login failure

    component.loginForm.setValue({ username: 'user', password: 'wrongpass' });
    component.onLogin();

    expect(authService.login).toHaveBeenCalledWith({
      userName: 'user',
      password: 'wrongpass',
    });
    expect(router.navigate).not.toHaveBeenCalled(); // It should not navigate on error
  });

  it('should call navigate to /products if user is not admin', () => {
    const loginResponse = { token: 'token123', userId: 'user123' };
    authService.login.mockReturnValue(of(loginResponse)); // Mocking successful login
    authService.isAdmin.mockReturnValue(false); // Non-admin user

    component.loginForm.setValue({ username: 'user', password: 'user123' });
    component.onLogin();

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });
});
