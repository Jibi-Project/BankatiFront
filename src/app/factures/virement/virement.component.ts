import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ECarteService } from '../../service/e-carte.service';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {
  virementForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  eCarte: any; // Carte de l'utilisateur connecté
  email: string = ''; // Email de l'utilisateur connecté

  constructor(
    private fb: FormBuilder,
    private eCarteService: ECarteService,
     private userService: UsersService,
  ) {}

  ngOnInit(): void {
    this.email = this.userService.getUserEmail()|| '';;

    // Initialisation du formulaire
    this.virementForm = this.fb.group({
      numeroCompte: ['', [Validators.required]],
      montant: ['', [Validators.required, Validators.min(1)]],
      motif: ['', Validators.required],
    });

    // Récupérer la carte de l'utilisateur connecté
    if (this.email) {
      this.getECarte();
    } else {
      this.errorMessage = 'Email not found in user profile';
    }
  }

  getECarte(): void {
    this.eCarteService.getECarteByEmail(this.email).subscribe({
      next: (data) => {
        this.eCarte = data;
        this.errorMessage = ''; // Clear any previous error messages
      },
      error: (err) => {
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
      senderNumeroCarte: this.eCarte.numeroCarte, // Carte de l'utilisateur connecté
      receiverNumeroCarte: this.virementForm.value.numeroCompte,
      amount: this.virementForm.value.montant,
      description: this.virementForm.value.motif,
    };

    this.eCarteService.doTransaction(payload).subscribe({
      next: (response) => {
        this.successMessage = 'Virement effectué avec succès.';
        this.errorMessage = '';
        this.virementForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Erreur lors du virement.';
        this.successMessage = '';
      },
    });
  }

  onReset(): void {
    this.virementForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }
}