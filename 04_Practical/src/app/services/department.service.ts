import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departments: Department[] = [
    new Department(1, 'HR'),
    new Department(2, 'IT'),
    new Department(3, 'Finance')
  ];
  
  private departmentsSubject = new BehaviorSubject<Department[]>(this.departments);
  
  constructor() { }
  
  getDepartments(): Observable<Department[]> {
    return this.departmentsSubject.asObservable();
  }
  
  addDepartment(name: string): void {
    const id = this.departments.length > 0 ? 
      Math.max(...this.departments.map(d => d.id)) + 1 : 1;
    
    const newDepartment = new Department(id, name);
    this.departments = [...this.departments, newDepartment];
    this.departmentsSubject.next(this.departments);
  }
  
  addUserToDepartment(departmentId: number, userId: number): void {
    const departmentIndex = this.departments.findIndex(d => d.id === departmentId);
    
    if (departmentIndex !== -1) {
      this.departments[departmentIndex].users.push(userId);
      this.departmentsSubject.next([...this.departments]);
    }
  }
  
  removeUserFromDepartment(departmentId: number, userId: number): void {
    const departmentIndex = this.departments.findIndex(d => d.id === departmentId);
    
    if (departmentIndex !== -1) {
      this.departments[departmentIndex].users = 
        this.departments[departmentIndex].users.filter(id => id !== userId);
      this.departmentsSubject.next([...this.departments]);
    }
  }
} 