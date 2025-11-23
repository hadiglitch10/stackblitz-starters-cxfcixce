import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private subscription?: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
    // Listen for when users are added or deleted
    this.subscription = this.userService.usersUpdated$.subscribe(() => {
      this.loadUsers();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Get the latest list of users
  loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  // Returns true if password has less than 5 characters
  isPasswordShort(password: string): boolean {
    if (password.length < 5) {
      return true;
    }
    return false;
  }

  // Remove user when clicked
  deleteUser(username: string): void {
    this.userService.deleteUser(username);
  }
}
