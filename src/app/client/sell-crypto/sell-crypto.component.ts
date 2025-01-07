import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ECarteService } from '../../service/e-carte.service';
import { UsersService } from '../../service/users.service';
import { WalletService } from '../../service/wallet.service';
import { Router } from '@angular/router';
import { CryptoService } from '../../service/crypto.service';

@Component({
  selector: 'app-sell-crypto',
  templateUrl: './sell-crypto.component.html',
  styleUrl: './sell-crypto.component.css'
})
export class SellCryptoComponent implements OnInit {
  crypto = '';
  fiat = '';
  userId: number | null = null // Store userId here
  amount: number | null = null;
  result: any = null;
  profileInfo: any = null; // Store profile info here
  errorMessage: string = '';
  action: string = 'sell'; 
    message: string = '';


  constructor(private cryptoService: CryptoService, private userService: UsersService,
    private walletService:WalletService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Method to load the user profile and fetch userId
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

      // Set the userId from profile info
      if (this.profileInfo.id) {
        this.userId = this.profileInfo.id;
        console.log('UserId set to:', this.userId);
      } else {
        console.warn('Profile ID not found in profile info:', this.profileInfo);
      }
    } catch (error: any) {
      console.error('Error loading profile:', error.message);
      this.errorMessage = error.message;
    }
  }

  // Method to buy crypto
  buyCrypto() {
    if (this.crypto && this.fiat && this.amount !== null && this.userId) {
      const request = {
        userId: this.userId, // Include userId in the request
        crypto: this.crypto,
        fiat: this.fiat,
        amount: this.amount,
      };
      this.cryptoService.sellCrypto(request).subscribe({
        next: (data) => {
          this.result = data;
          console.log('Crypto bought successfully:', data);
          // Update the wallet balance
          this.updateBalance();

        },
        error: (err) => {
          console.error('Error buying crypto:', err);
          this.result = { error: 'Transaction failed!' };
        },
      });
    } else {
      console.warn('Missing fields for buying crypto.');
      this.errorMessage = 'Please fill in all fields.';
    }
  }

  updateBalance() {
    if (this.userId && this.amount !== null) {
      this.walletService.updateBalance(this.userId, this.action, this.amount).subscribe({
        next: (response) => {
          this.message = response;
          console.log('Wallet balance updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating wallet balance:', error);
          this.message = error.error || 'Error updating balance';
        },
      });
    } else {
      console.warn('Cannot update balance: Missing userId or amount.');
      this.errorMessage = 'Cannot update balance.';
    }
  }
}