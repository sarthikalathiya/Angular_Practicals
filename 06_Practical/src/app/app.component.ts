import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserListComponent, UserAddComponent],
  template: `
    <div class="container">
      <h1 class="text-center my-4">User Management System</h1>
      <app-user-add></app-user-add>
      <app-user-list></app-user-list>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    h1 {
      color: #333;
    }
  `]
})
export class AppComponent {
  title = 'user-management';
}
