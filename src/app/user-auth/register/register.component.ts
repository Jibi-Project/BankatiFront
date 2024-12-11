import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isSuccessful = false;
  isSignUpFailed = false;
  formData: any = {
    nom: '',
    email: '',
    password: '',
    role: '',
    adresse: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.nom || !this.formData.email || !this.formData.password || !this.formData.role || !this.formData.adresse) {
      this.showError('Please fill in all fields.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('Are you sure you want to register this user?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await this.userService.register(this.formData, token);
      if (response.statutCode === 200) {
        this.router.navigate(['/users']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
