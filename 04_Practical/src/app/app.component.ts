import { Component } from '@angular/core';
import { DepartmentListComponent } from './components/department-list/department-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DepartmentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Department User Management';
}
