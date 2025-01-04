import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ECarteService } from '../../service/e-carte.service';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-creancier-details',
  templateUrl: './creancier-details.component.html',
  styleUrl: './creancier-details.component.css'
})
export class CreancierDetailsComponent implements OnInit {
  virementForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  eCarte: any; // Carte de l'utilisateur connecté
  email: string = ''; // Email de l'utilisateur connecté
  selectedCreancier: any = null; // Créancier sélectionné

  constructor(
    private fb: FormBuilder,
    private eCarteService: ECarteService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.email = this.userService.getUserEmail() || '';

    const state = history.state;
    if (state && state.creancier) {
      this.selectedCreancier = state.creancier;
    }

    // Initialize the form
    this.virementForm = this.fb.group({
      numeroCompte: ['', [Validators.required]],
      montant: ['', [Validators.required, Validators.min(1)]],
      motif: ['Paiement', Validators.required], // Default description to "Paiement"
    });

    // Fetch the user's eCarte
    if (this.email) {
      this.getECarte();
    } else {
      this.errorMessage = 'Email introuvable dans le profil utilisateur.';
    }
  }

  getECarte(): void {
    this.eCarteService.getECarteByEmail(this.email).subscribe({
      next: (data) => {
        this.eCarte = data;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la récupération de votre carte.';
      },
    });
  }

  onSubmit(): void {
    if (this.virementForm.invalid || !this.eCarte) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    const payload = {
      senderNumeroCarte: this.eCarte.numeroCarte, // User's card number
      receiverNumeroCarte: this.virementForm.value.numeroCompte, // Receiver's account
      amount: this.virementForm.value.montant,
      description: this.virementForm.value.motif,
    };

    this.eCarteService.doTransaction(payload).subscribe({
      next: () => {
        this.successMessage = 'Virement effectué avec succès.';
        this.errorMessage = '';
        this.virementForm.reset({ motif: 'Paiement' }); // Reset the form with default description
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Erreur lors du virement.';
        this.successMessage = '';
      },
    });
  }

  onReset(): void {
    this.virementForm.reset({ motif: 'Paiement' }); // Reset the form with default description
    this.errorMessage = '';
    this.successMessage = '';
  }
}