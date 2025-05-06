import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'assets/db.json';
  private users = new BehaviorSubject<User[]>([]);
  users$ = this.users.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers() {
    this.http.get<{users: User[]}>(this.apiUrl)
      .pipe(map(response => response.users))
      .subscribe(users => this.users.next(users));
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  addUser(user: Omit<User, 'id'>): void {
    const currentUsers = this.users.value;
    const newUser: User = {
      ...user,
      id: currentUsers.length + 1,
      joinDate: new Date()
    };
    this.users.next([...currentUsers, newUser]);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return passwordRegex.test(password);
  }

  emailExists(email: string): boolean {
    return this.users.value.some(user => user.email === email);
  }
}