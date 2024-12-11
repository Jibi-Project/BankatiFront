import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;

  constructor(
    private readonly usersService: UsersService,
    private router: Router
  ) {}

  async handleSubmit() {
    if (!this.email || !this.password) {
      this.showError("L'email et le mot de passe sont requis.");
      return;
    }

    try {
      const response = await this.usersService.login(this.email, this.password);
      console.log('Response received:', response);
      if (response.statutCode === 200) {
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.router.navigate(['/profile']);
        console.log('Navigating to profile...');
      } else {
        this.showError(response.message);
        this.isLoginFailed = true;
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      this.showError("Erreur lors de la connexion.");
      this.isLoginFailed = true;
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
