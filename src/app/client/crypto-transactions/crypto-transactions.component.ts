import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-crypto-transactions',
  templateUrl: './crypto-transactions.component.html',
  styleUrls: ['./crypto-transactions.component.css'] // Fixed typo from `styleUrl` to `styleUrls`
})
export class CryptoTransactionsComponent implements OnInit {
  displayedColumns: string[] = ['cryptoName', 'amount', 'transactionType', 'transactionDate', 'rate'];
  transactions: any[] = [];
  profileInfo: any = null; // Store profile info here
  userId: number | null = null; // Store userId here
  errorMessage: string = '';

  constructor(private http: HttpClient, private userService: UsersService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

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

        // Load transactions after the userId is set
        this.loadTransactions();
      } else {
        console.warn('Profile ID not found in profile info:', this.profileInfo);
      }
    } catch (error: any) {
      console.error('Error loading profile:', error.message);
      this.errorMessage = error.message;
    }
  }

  loadTransactions(): void {
    if (!this.userId) {
      console.warn('UserId is null. Cannot load transactions.');
      return;
    }

    console.log('Loading transactions for userId:', this.userId);
    this.http.get<any[]>(`http://localhost:1015/api/crypto/user/${this.userId}`)
      .subscribe({
        next: (data) => {
          this.transactions = data;
          console.log('Transactions loaded:', this.transactions);
        },
        error: (err) => {
          console.error('Error loading transactions:', err);
          this.errorMessage = 'Failed to load transactions';
        }
      });
  }
}
