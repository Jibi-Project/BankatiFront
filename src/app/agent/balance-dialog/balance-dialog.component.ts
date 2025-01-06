import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-balance-dialog',
  templateUrl: './balance-dialog.component.html',
  styleUrl: './balance-dialog.component.css'
})
export class BalanceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BalanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newBalance: number }
  ) {}

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }

  onSave(): void {
    this.dialogRef.close(this.data.newBalance); // Return the new balance
  }

}
