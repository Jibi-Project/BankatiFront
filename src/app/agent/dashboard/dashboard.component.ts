import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userCount: number | null = null;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUserCount().subscribe({
      next: (count) => (this.userCount = count),
      error: (err) => console.error('Error fetching user count:', err),
    });
  }
}