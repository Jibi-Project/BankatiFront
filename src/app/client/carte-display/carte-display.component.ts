import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ECarteService } from '../../service/e-carte.service';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carte-display',
  templateUrl: './carte-display.component.html',
  styleUrl: './carte-display.component.css'
})
export class CarteDisplayComponent implements OnInit {

  email: string = '';
  eCarte: any = null;
  errorMessage: string = '';
 // Assuming this holds the profile data, adjust accordingly if needed.
  profileInfo: any; 

  constructor(
    private eCarteService: ECarteService,
    private userService: UsersService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Fetch the email from the UsersService
    this.email = this.userService.getUserEmail()|| '';;

    // Fetch the eCarte using the email
    if (this.email) {
      this.getECarte();
    } else {
      this.errorMessage = 'Email not found in user profile';
    }
    this.loadUserProfile();
  }

    // Méthode pour charger le profil de l'utilisateur
    async loadUserProfile() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No Token Found');
        }
  
        // Assurez-vous que la méthode getYourProfile existe dans votre service UserService
        this.profileInfo = await this.userService.getYourProfile(token);
        console.log(this.profileInfo);  // Affiche les informations du profil dans la console
      } catch (error: any) {
        console.error('Error loading profile:', error.message);
        this.showError(error.message); // Si vous avez une méthode showError pour afficher les erreurs
      }
    }
      // Méthode pour afficher les erreurs (si vous en avez une)
  showError(message: string) {
    // Code pour afficher une erreur (par exemple, une alerte ou un toast)
    alert(message);
  }

  // Fetch eCarte based on the email
  getECarte(): void {
    this.eCarteService.getECarteByEmail(this.email).subscribe({
      next: (data) => {
        this.eCarte = data;
        this.errorMessage = ''; // Clear any previous error messages
      },
      error: (err) => {
        this.eCarte = null; // Reset eCarte if there's an error
        this.errorMessage = err.status === 404 ? 'Les informations de la carte ne sont pas disponibles.' : 'Une erreur est survenue.';
      }
    });
  }
}
