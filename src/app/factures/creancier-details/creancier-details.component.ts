import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-creancier-details',
  templateUrl: './creancier-details.component.html',
  styleUrl: './creancier-details.component.css'
})
export class CreancierDetailsComponent implements OnInit {
  selectedCreancier: any = {}; // Holds creancier details
  factureCode: string = ''; // For input field
  montant: number | null = null; // For input field
  addToFavoris: boolean = false; // Checkbox state

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the selected creancier details from route state
    const state = history.state;
    if (state && state.creancier) {
      this.selectedCreancier = state.creancier;
    } else {
      // If no data, navigate back to the list
      this.router.navigate(['/creanciers']);
    }
  }

  onSubmit(): void {
    if (!this.factureCode || !this.montant) {
      alert('Please fill in all fields.');
      return;
    }

    // Proceed to payment logic
    console.log('Payment details:', {
      creancier: this.selectedCreancier,
      factureCode: this.factureCode,
      montant: this.montant,
      addToFavoris: this.addToFavoris
    });

    // Redirect to payment confirmation or perform API call
    this.router.navigate(['/payment-confirmation'], {
      state: { creancier: this.selectedCreancier, factureCode: this.factureCode, montant: this.montant }
    });
  }
}