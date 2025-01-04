import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { WalletService } from '../../service/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrl: './addclient.component.css'
})
export class AddclientComponent {
  user = {
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    role: 'USER', // Default role
    password: '12345678', // Temporary default password
  };

  initialBalance = 0; // Initial balance for the wallet
  selectedProduct = ''; // Selected account type

  constructor(private userService: UsersService,
              private walletservice: WalletService,
              private router: Router) {}

  // Submit the form
  onSubmit() {
    // Register the user
    this.userService.registerUser(this.user).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);

        // Create a wallet for the user
        this.walletservice.createWallet(this.user.email, this.getInitialBalance()).subscribe({
          next: (walletResponse) => {
            console.log('Wallet created successfully:', walletResponse);
            this.router.navigate(['/listeClient']);
          },
          error: (err) => {
            console.error('Error creating wallet:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error registering user:', err);
      },
    });
  }

  // Determine the initial balance based on the selected product
  getInitialBalance(): number {
    switch (this.selectedProduct) {
      case 'Hissab 1':
        return 200;
      case 'Hissab 2':
        return 5000;
      case 'Hissab 3':
        return 20000;
      default:
        return 0;
    }
  }
}


