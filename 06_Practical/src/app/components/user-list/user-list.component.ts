import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { EmailLinkPipe } from '../pipes/email-link.pipe';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, EmailLinkPipe],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
} 