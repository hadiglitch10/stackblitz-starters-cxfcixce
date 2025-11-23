import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// User data structure
export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Store all users here
  private users: User[] = [];
  private usersUpdated = new Subject<void>();
  usersUpdated$ = this.usersUpdated.asObservable();

  constructor() { }

  // Register new user - returns false if username taken
  addUser(username: string, password: string): boolean {
    // Check for duplicate username
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) {
        return false;
      }
    }
    
    // Add the new user
    this.users.push({ username, password });
    this.usersUpdated.next();
    return true;
  }

  // Get all registered users
  getUsers(): User[] {
    return this.users;
  }

  // Remove user from list
  deleteUser(username: string): void {
    this.users = this.users.filter(user => user.username !== username);
    this.usersUpdated.next();
  }
}
