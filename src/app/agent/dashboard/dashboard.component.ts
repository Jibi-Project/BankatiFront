import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { ECarteService } from '../../service/e-carte.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userCount: number | null = null;
  chart: any;

  averageAmount: number | null = null;
  isLoading: boolean = true;


  constructor(private userService: UsersService ,private eCarteService: ECarteService) {}

  ngOnInit(): void {
    this.userService.getUserCount().subscribe({
      next: (count) => (this.userCount = count),
      error: (err) => console.error('Error fetching user count:', err),
    });
    this.eCarteService.getTransactionsPerDay().subscribe((data) => {
      this.createChart(data);
    });

    this.fetchAverageTransactionAmount();

  }

  fetchAverageTransactionAmount(): void {
    this.eCarteService.getAverageTransactionAmount().subscribe(
      (data) => {
        this.averageAmount = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching average transaction amount:', error);
        this.isLoading = false;
      }
    );
  }

  createChart(data: { [key: string]: number }): void {
    const labels = Object.keys(data); // Get the dates
    const values = Object.values(data); // Get the transaction counts

    this.chart = new Chart('transactionsChart', {
      type: 'bar', // You can use 'line', 'pie', etc.
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Transactions Par jour',
            data: values,
            backgroundColor: 'rgba(233, 156, 92, 0.2)', // Light color
            borderColor: 'rgb(139, 98, 51)', // Border color
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}