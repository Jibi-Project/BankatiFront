import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbonnementsService } from '../service/abonnement.service';
import { ECarteService } from '../service/e-carte.service'; // To fetch ECarte details
import { UsersService } from '../service/users.service'; // To get user information

@Component({
  selector: 'app-abonnements',
  templateUrl: './abonnements.component.html',
  styleUrls: ['./abonnements.component.scss'],
})
export class AbonnementsComponent implements OnInit {
  abonnementForm!: FormGroup; // Form for creating a recurring payment
  walletId!: number; // Store the user's wallet ID
  email: string = ''; // Store the user's email
  eCarte: any; // Store the user's ECarte details
  errorMessage: string = ''; // Error message to display in case of failure
  successMessage: string = ''; // Success message to display when successful
  abonnements: any[] = []; // List of recurring payments to display

  constructor(
    private fb: FormBuilder,
    private abonnementsService: AbonnementsService, // Service for recurring payment API calls
    private eCarteService: ECarteService, // Service for fetching ECarte
    private usersService: UsersService // Service to fetch user details
  ) {}

  ngOnInit(): void {
    this.email = this.usersService.getUserEmail() || ''; // Fetch logged-in user's email
    if (!this.email) {
      this.errorMessage = 'Email not found. Please log in again.';
      return;
    }

    this.initializeForm(); // Initialize the form
    this.fetchECarte(); // Fetch the user's ECarte details
  }

  // Initialize the form with validation
  initializeForm(): void {
    this.abonnementForm = this.fb.group({
      senderUserId: [null, Validators.required], // Wallet ID (dynamically patched)
      serviceName: ['', Validators.required], // Service name (e.g., Orange, Inwi)
      amount: [0, [Validators.required, Validators.min(1)]], // Amount (must be > 0)
      frequency: ['', Validators.required], // Frequency (e.g., Monthly, Weekly)
      startDate: ['', Validators.required], // Start date of the recurring payment
      endDate: ['', Validators.required], // End date
    });
  }

  // Fetch the user's ECarte details
  fetchECarte(): void {
    this.eCarteService.getECarteByEmail(this.email).subscribe({
      next: (data) => {
        this.eCarte = data;
        if (this.eCarte && this.eCarte.walletId) {
          this.walletId = this.eCarte.walletId; // Extract wallet ID from the ECarte
          this.abonnementForm.patchValue({ senderUserId: this.walletId }); // Patch wallet ID into the form
          this.errorMessage = ''; // Clear any error messages
        } else {
          this.errorMessage = 'Wallet ID not found in ECarte.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error fetching ECarte. Please ensure you have a valid ECarte.';
        console.error('Error fetching ECarte:', err);
      },
    });
  }

  // Submit the form to create a recurring payment
  submitAbonnement(): void {
    if (this.abonnementForm.invalid || !this.walletId) {
      this.errorMessage = 'Please fill all the fields correctly.';
      alert(this.errorMessage); // Show an alert for errors
      return;
    }

    const payload = this.abonnementForm.value; // Get form data
    console.log('Payload to send:', payload);

    this.abonnementsService.addRecurringPayment(payload).subscribe({
      next: (response: string) => {
        this.successMessage = response; // Directly set the backend response message
        this.errorMessage = '';
        alert('Recurring payment created successfully!'); // Show success message
        this.abonnementForm.reset(); // Reset the form
        this.abonnementForm.patchValue({ senderUserId: this.walletId }); // Retain wallet ID
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error creating recurring payment.';
        this.successMessage = '';
        console.error('Error creating recurring payment:', error);
        alert(this.errorMessage); // Show an alert for errors
      },
    });
  }


  // Reset the form
  cancelAbonnement(): void {
    this.abonnementForm.reset();
    this.abonnementForm.patchValue({ senderUserId: this.walletId }); // Retain wallet ID
    this.errorMessage = '';
    this.successMessage = '';
  }
}
