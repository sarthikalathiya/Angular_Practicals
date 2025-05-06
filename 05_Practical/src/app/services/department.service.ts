import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'assets/db.json';
  private departments = new BehaviorSubject<Department[]>([]);
  departments$ = this.departments.asObservable();

  constructor(private http: HttpClient) {
    this.loadDepartments();
  }

  private loadDepartments() {
    this.http.get<{departments: Department[]}>(this.apiUrl)
      .pipe(map(response => response.departments))
      .subscribe(departments => this.departments.next(departments));
  }

  getDepartments(): Observable<Department[]> {
    return this.departments$;
  }

  addDepartment(name: string): Department {
    const currentDepartments = this.departments.value;
    const existingDepartment = currentDepartments.find(d => d.name.toLowerCase() === name.toLowerCase());
    
    if (existingDepartment) {
      return existingDepartment;
    }

    const newDepartment: Department = {
      id: currentDepartments.length + 1,
      name: name
    };

    this.departments.next([...currentDepartments, newDepartment]);
    return newDepartment;
  }
} 