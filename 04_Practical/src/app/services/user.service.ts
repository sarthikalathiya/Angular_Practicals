import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { DepartmentService } from './department.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    new User(1, 'John Doe', 1),
    new User(2, 'Jane Smith', 2),
    new User(3, 'Bob Johnson', 1)
  ];
  
  private usersSubject = new BehaviorSubject<User[]>(this.users);
  
  constructor(private departmentService: DepartmentService) {
    // Initialize departments with existing users
    this.users.forEach(user => {
      this.departmentService.addUserToDepartment(user.departmentId, user.id);
    });
  }
  
  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }
  
  addUser(name: string, departmentId: number): void {
    const id = this.users.length > 0 ? 
      Math.max(...this.users.map(u => u.id)) + 1 : 1;
    
    const newUser = new User(id, name, departmentId);
    this.users = [...this.users, newUser];
    this.usersSubject.next(this.users);
    
    // Update department
    this.departmentService.addUserToDepartment(departmentId, id);
  }
  
  getUsersByDepartment(departmentId: number | null): User[] {
    if (departmentId === null) {
      return this.users;
    }
    return this.users.filter(user => user.departmentId === departmentId);
  }
} 