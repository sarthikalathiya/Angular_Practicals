import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Department } from '../../models/department.model';
import { User } from '../../models/user.model';
import { DepartmentService } from '../../services/department.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  users: User[] = [];
  selectedDepartment: number | null = null;
  newDepartmentName: string = '';
  newUserName: string = '';
  newUserDepartment: number = 0;
  expandedDepartmentId: number | null = null;

  constructor(
    private departmentService: DepartmentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
      if (this.departments.length > 0 && this.newUserDepartment === 0) {
        this.newUserDepartment = this.departments[0].id;
      }
    });

    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  getUsersForDepartment(departmentId: number): User[] {
    return this.users.filter(user => user.departmentId === departmentId);
  }

  addDepartment(): void {
    if (this.newDepartmentName.trim()) {
      this.departmentService.addDepartment(this.newDepartmentName);
      this.newDepartmentName = '';
    }
  }

  addUser(): void {
    if (this.newUserName.trim() && this.newUserDepartment) {
      this.userService.addUser(this.newUserName, this.newUserDepartment);
      this.newUserName = '';
    }
  }

  filterByDepartment(departmentId: number | null): void {
    this.selectedDepartment = departmentId;
  }

  toggleDepartment(departmentId: number): void {
    this.expandedDepartmentId = this.expandedDepartmentId === departmentId ? null : departmentId;
  }

  getDepartmentsToShow(): Department[] {
    if (this.selectedDepartment === null) {
      return this.departments;
    } else {
      return this.departments.filter(dept => dept.id === this.selectedDepartment);
    }
  }
} 