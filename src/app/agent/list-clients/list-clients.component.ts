import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'email', 'nom', 'prenom', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private yourService: UsersService,private readonly router: Router) {}

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
     // console.log('API Response:', response);
      const users = response.ourUsersList; // Ensure this key exists in the response
      const filteredUsers = users.filter((user: User) => user.role === 'USER');
      console.log('Filtered Users:', filteredUsers);
      this.dataSource.data = filteredUsers;
    } catch (error) {
      this.showError('Failed to fetch data. Please try again later.');
      console.error('Error fetching users:', error);
    }
  }

  toggleLock(user: any): void {
    const lock = user.accountNonLocked; // If account is unlocked, lock it
    this.yourService.toggleLockUser(user.id, lock).subscribe({
      next: (response) => {
        user.accountNonLocked = !lock; // Toggle the lock status in the UI
        alert(response.message);
      },
      error: (err) => {
        console.error(err);
        alert('An error occurred while toggling the account lock status.');
      }
    });
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
}

export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  adresse: string;
  role: string;
  accountNonLocked:boolean;
}
