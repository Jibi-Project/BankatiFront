import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-content',
  template: `
    <h1 mat-dialog-title>Succès</h1>
    <div mat-dialog-content>
      <p>L'opération a été effectuée avec succès !</p>
    </div>
    <div mat-dialog-actions>
    <button 
  mat-raised-button 
  [style.background-color]="'orange'" 
  [style.color]="'white'" 
  (click)="viewCard()">
  Voir la carte
</button>

    </div>
  `,
  styles: [`
    h1 {
      color: #4caf50;
    }
    div[mat-dialog-content] {
      font-size: 16px;
      margin-bottom: 20px;
    }
    div[mat-dialog-actions] {
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class DialogContentComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Données passées au dialogue
    private router: Router
  ) {}

  // Fermer le dialogue et naviguer vers card-details
  viewCard(): void {
    this.dialogRef.close(); // Ferme le dialogue
    this.router.navigate(['/card-details'], { 
      queryParams: { eCarte: JSON.stringify(this.data.eCarte) } // Passe la carte via des paramètres de requête
    });
  }
}
