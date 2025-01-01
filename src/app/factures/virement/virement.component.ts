import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {
  virementForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.virementForm = this.fb.group({
      nomBeneficiaire: ['', Validators.required],
      numeroCompte: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      montant: ['', [Validators.required, Validators.min(1)]],
      motif: ['']
    });
  }

  onSubmit(): void {
    if (this.virementForm.valid) {
      console.log('Données du formulaire de virement :', this.virementForm.value);
      // Ajouter le traitement des données ici, comme un appel API.
    }
  }

  onReset(): void {
    this.virementForm.reset();
  }
}
