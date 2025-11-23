import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  // Called when user clicks Sign Up button
  onSignUp(): void {
    this.errorMessage = '';

    // Make sure both fields have something
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Try to register the user
    const success = this.userService.addUser(this.username, this.password);
    
    if (!success) {
      this.errorMessage = 'Username already exists!';
    } else {
      // Reset form after successful registration
      this.username = '';
      this.password = '';
    }
  }
}
