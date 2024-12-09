import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private readonly usersService: UsersService,
    private router: Router
  ) { }


  email: string = ''
  password: string = ''
  errorMessage: string = ''

  async handleSubmit() {

    if (!this.email || !this.password) {
      this.showError("Email and Password is required");
      return
    }

    try {
      const response = await this.usersService.login(this.email, this.password);
      console.log('Response received:', response);
      if (response.statutCode === 200) {
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/profile']);
        console.log('Navigating to profile...');
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      this.showError(error.message);
    }
    

  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
