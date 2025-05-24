import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from '../models/user.model';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://localhost:5001/api/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a user by ID', () => {
    const dummyUser: User = { id: '1', userName: 'JohnDoe', isAdmin: false, email: 'john@example.com' };

    service.getUser('1').subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should fetch all users', () => {
    const dummyUsers: User[] = [
      { id: '1', userName: 'JohnDoe', isAdmin: false, email: 'john@example.com' },
      { id: '2', userName: 'JaneDoe', isAdmin: true, email: 'jane@example.com' },
    ];

    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should update a user', () => {
    const updatedUser: User = { id: '1', userName: 'UpdatedName', isAdmin: true, email: 'updated@example.com' };

    service.updateUser(updatedUser).subscribe((user) => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      UserName: updatedUser.userName,
      IsAdmin: updatedUser.isAdmin,
      Email: updatedUser.email,
    });
    req.flush(updatedUser);
  });

  it('should have default updatedUser BehaviorSubject as false', () => {
    service.updatedUser.subscribe((value) => {
      expect(value).toBe(false);
    });
  });
});
