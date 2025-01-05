import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
import { WalletService } from '../../service/wallet.service';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BalanceDialogComponent } from '../balance-dialog/balance-dialog.component';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrl: './comptes.component.css'
})
export class ComptesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'email', 'nom', 'prenom', 'balance', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private yourService: UsersService,private readonly router: Router , 
    private dialog: MatDialog,
     private walletService: WalletService,
  ) {}

  ngOnInit(): void {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No Token Found');
      }
      this.fetchUsers(token);
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async fetchUsers(token: string): Promise<void> {
    try {
      const response = await this.yourService.getAllUsers(token);
      const users = response.ourUsersList; // Fetch all users
  
      // Filter users based on the role
      const filteredUsers = users.filter((user: User) => user.role === 'USER');
  
      // Fetch balances for each user
      const usersWithBalances = await Promise.all(
        filteredUsers.map(async (user: User) => {
          try {
            const wallet = await lastValueFrom(this.walletService.getWallet(user.id));
            return { ...user, balance: wallet.balance }; // Append balance to user object
          } catch (error) {
            console.error(`Failed to fetch balance for user ID ${user.id}`, error);
            return { ...user, balance: 0 }; // Default balance for failed requests
          }
        })
      );
  
      // Update the data source
      this.dataSource.data = usersWithBalances;
      console.log('Users with balances:', this.dataSource.data);
    } catch (error) {
      console.error('Error fetching users or balances:', error);
      this.showError('Failed to load user data. Please try again later.');
    }
  }
  
  


  

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(element: User): void {
    console.log('Editing user', element);
  }

  delete(element: User): void {
    console.log('Deleting user', element);
  }

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  navigateToUpdate(userId: string) {
    this.router.navigate(['/update', userId]);
  }

  onEditBalance(user: User): void {
    const dialogRef = this.dialog.open(BalanceDialogComponent, {
      width: '400px',
      data: { newBalance: user.balance }, // Pass current balance to the dialog
    });

    dialogRef.afterClosed().subscribe((newBalance) => {
      if (newBalance != null) {
        this.updateBalance(user.id, newBalance);
      }
    });
  }

  updateBalance(userId: number, newBalance: number): void {
    this.walletService.updateWalletBalance(userId, newBalance).subscribe(
      () => {
        // Update the local data source
        const user = this.dataSource.data.find((u) => u.id === userId);
        if (user) {
          user.balance = newBalance;
        }
        console.log(`Balance for user ID ${userId} updated to ${newBalance}`);
      },
      (error) => {
        console.error('Failed to update balance', error);
      }
    );
  }
}

export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  adresse: string;
  role: string;
  accountNonLocked:boolean;
  balance:number;
}

