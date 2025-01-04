import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ECarteService } from '../../service/e-carte.service';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
import { WalletService } from '../../service/wallet.service';

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
  wallet: any = null;

  constructor(
    private eCarteService: ECarteService,
    private userService: UsersService,
    private router: Router,
    public dialog: MatDialog,
    private walletService: WalletService,
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
    
        console.log('Fetching user profile with token:', token);
        const response = await this.userService.getYourProfile(token);
        console.log('API Response:', response);
    
        // Access the nested `ourUsers` object
        this.profileInfo = response.ourUsers;
        if (!this.profileInfo) {
          throw new Error('User profile data is empty');
        }
    
        console.log('Profile Info:', this.profileInfo);
    
        if (this.profileInfo.id) {
          console.log('Calling fetchWalletBalance with userId:', this.profileInfo.id);
          this.fetchWalletBalance(this.profileInfo.id);
        } else {
          console.warn('Profile ID not found in profile info:', this.profileInfo);
        }
      } catch (error: any) {
        console.error('Error loading profile:', error.message);
        this.showError(error.message);
      }
    }
    

      // Fetch wallet balance based on userId
  fetchWalletBalance(userId: number): void {
    this.walletService.getWallet(userId).subscribe({
      next: (data) => {
        this.wallet = data;
        console.log('Wallet:', this.wallet);
      },
      error: (err) => {
        console.error('Error fetching wallet:', err);
        this.wallet = null;
      }
    });
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
        // Handle 404 error specifically for no card found
        if (err.status === 404) {
          this.errorMessage = 'Les informations de la carte ne sont pas disponibles.';
          
          // Navigate to /genereCarte if eCarte is not found
          this.router.navigate(['/generCarte']);
        } else {
          this.errorMessage = 'Une erreur est survenue.';
        }    
      }
    });
  }
}
