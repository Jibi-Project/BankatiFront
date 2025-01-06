import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-abonnements',
  templateUrl: './abonnements.component.html',
  styleUrls: ['./abonnements.component.scss'],
})
export class AbonnementsComponent implements OnInit {
  abonnementForm!: FormGroup;
  abonnements: any[] = [];
  displayedColumns: string[] = [
    'serviceName',
    'amount',
    'nextPaymentDate',
    'frequency',
    'status',
    'actions',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadAbonnements();
  }

  initializeForm() {
    this.abonnementForm = this.fb.group({
      serviceName: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      frequency: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
    });
  }

  loadAbonnements() {
    // Fetch abonnements from backend (replace with real API)
    this.abonnements = [
      {
        serviceName: 'Maroc Telecom',
        amount: 100,
        nextPaymentDate: new Date(),
        frequency: 'Mensuel',
        status: 'Actif',
      },
      {
        serviceName: 'Orange',
        amount: 50,
        nextPaymentDate: new Date(),
        frequency: 'Mensuel',
        status: 'Actif',
      },
    ];
  }

  submitAbonnement() {
    const abonnement = this.abonnementForm.value;
    abonnement.nextPaymentDate = abonnement.startDate; // Set the next payment date to the start date
    abonnement.status = 'Actif';

    this.abonnements.push(abonnement);
    alert('Abonnement ajouté avec succès!');
    this.abonnementForm.reset();
  }

  cancelAbonnement() {
    this.abonnementForm.reset();
  }

  editAbonnement(abonnement: any) {
    this.abonnementForm.patchValue(abonnement);
  }

  deleteAbonnement(id: number) {
    this.abonnements = this.abonnements.filter((abonnement) => abonnement.id !== id);
    alert('Abonnement supprimé avec succès!');
  }
}
