import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ECarteService } from '../../service/e-carte.service';
import { UsersService } from '../../service/users.service';
import { WalletService } from '../../service/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transcation-history',
  templateUrl: './transcation-history.component.html',
  styleUrl: './transcation-history.component.css'
})
export class TranscationHistoryComponent implements OnInit {
  displayedColumns: string[] = ['receiverId', 'amount', 'description', 'createdAt'];

  email: string = '';
  eCarte: any = null;
  errorMessage: string = '';
  profileInfo: any; 
  wallet: any = null;
  transactions: any[] = []; // To store the fetched transactions

  constructor(
    private eCarteService: ECarteService,
    private userService: UsersService,
    private router: Router,
    public dialog: MatDialog,
    private walletService: WalletService,

  ) {}

  ngOnInit(): void {
    // Fetch the email from the UsersService
    this.email = this.userService.getUserEmail() || '';

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

  // Méthode pour afficher les erreurs (si vous en avez une)
  showError(message: string) {
    alert(message); // Code pour afficher une erreur (par exemple, une alerte ou un toast)
  }

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

  // Fetch eCarte based on the email
  getECarte(): void {
    this.eCarteService.getECarteByEmail(this.email).subscribe({
      next: (data) => {
        this.eCarte = data;
        this.errorMessage = ''; // Clear any previous error messages

        // Fetch transactions using numeroCarte as senderId
        if (this.eCarte && this.eCarte.numeroCarte) {
          this.fetchTransactions(this.eCarte.numeroCarte);
        }
      },
      error: (err) => {
        this.eCarte = null; // Reset eCarte if there's an error
        if (err.status === 404) {
          this.errorMessage = 'Les informations de la carte ne sont pas disponibles.';
          this.router.navigate(['/generCarte']); // Navigate if eCarte not found
        } else {
          this.errorMessage = 'Une erreur est survenue.';
        }
      }
    });
  }

  // Fetch transactions using senderId
  fetchTransactions(senderId: string): void {
    this.eCarteService.getTransactionsBySenderId(senderId).subscribe({
      next: (data) => {
        this.transactions = data;
        console.log('Transactions fetched successfully:', this.transactions);
      },
      error: (err) => {
        console.error('Error fetching transactions:', err.message);
        this.errorMessage = 'Unable to fetch transaction history.';
      }
    });
  }
  
}