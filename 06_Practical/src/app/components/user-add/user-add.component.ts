import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  departments: Department[] = [];
  submitted = false;
  showNewDepartment = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private departmentService: DepartmentService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      newDepartment: [''],
      salary: ['', [Validators.required, Validators.min(0)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)]]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
    
    // Watch for department changes
    this.userForm.get('department')?.valueChanges.subscribe(value => {
      if (value === 'new') {
        this.showNewDepartment = true;
        this.userForm.get('newDepartment')?.setValidators([Validators.required]);
      } else {
        this.showNewDepartment = false;
        this.userForm.get('newDepartment')?.clearValidators();
      }
      this.userForm.get('newDepartment')?.updateValueAndValidity();
    });
  }

  private loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    // Clear previous error message
    this.errorMessage = '';

    if (this.userForm.valid) {
      const formValue = { ...this.userForm.value };

      if (this.userService.emailExists(formValue.email)) {
        this.errorMessage = "Email already there";
        return;
      }

      if (formValue.department === 'new' && formValue.newDepartment) {
        const newDepartment = this.departmentService.addDepartment(formValue.newDepartment);
        formValue.department = newDepartment.name;
      }

      delete formValue.newDepartment;
      this.userService.addUser(formValue);
      this.userForm.reset();
      this.submitted = false;
      this.showNewDepartment = false;
    }
  }

  get f() {
    return this.userForm.controls;
  }
}