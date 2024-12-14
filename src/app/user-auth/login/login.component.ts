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
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
        }
  
        this.isLoggedIn = true;
        this.isLoginFailed = false;
  
        this.router.navigate(['/profile']).then(() => {
          console.log('Navigated to profile successfully.');
        }).catch((err) => {
          console.error('Navigation failed:', err);
          this.showError("Erreur lors de la redirection.");
        });
      } else {
        this.showError(response.message || "Erreur d'authentification.");
        this.isLoginFailed = true;
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      if (error.status === 0) {
        this.showError("Connexion au serveur impossible. Vérifiez votre réseau.");
      } else if (error.error?.message) {
        this.showError(error.error.message);
      } else {
        this.showError("Une erreur inattendue est survenue.");
      }
      this.isLoginFailed = true;
    }
  }

  showError(message: string) { // Ensure it's here, inside the class
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
  
}
