import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CryptoService } from '../../service/crypto.service';

@Component({
  selector: 'app-cryptoconvert',
  templateUrl: './cryptoconvert.component.html',
  styleUrl: './cryptoconvert.component.css'
})
export class CryptoconvertComponent {
  convertForm: FormGroup;
  result: any;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private cryptoService: CryptoService) {
    this.convertForm = this.fb.group({
      crypto: ['bitcoin', Validators.required],
      fiat: ['usd', Validators.required],
      amount: [0.05, [Validators.required, Validators.min(0)]],
      direction: ['crypto-to-fiat', Validators.required]
    });
  }

  onSubmit() {
    if (this.convertForm.valid) {
      this.cryptoService.convertCrypto(this.convertForm.value).subscribe({
        next: (response) => {
          this.result = response;
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = err.error;
          this.result = null;
        }
      });
    }
  }

  onBuy() {
    if (this.result) {
      alert(`Buying crypto worth ${this.convertForm.value.amount} ${this.convertForm.value.fiat}!`);
      // Add your buy logic here
    } else {
      alert('Please convert an amount before buying!');
    }
  }
  
  onSell() {
    if (this.result) {
      alert(`Selling crypto worth ${this.convertForm.value.amount} ${this.convertForm.value.crypto}!`);
      // Add your sell logic here
    } else {
      alert('Please convert an amount before selling!');
    }
  }
  
}


