import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private baseUrl = 'http://localhost:1012/api/wallets'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getWallet(userId: number): Observable<{ balance: number }> {
    return this.http.get<{ balance: number }>(`${this.baseUrl}/${userId}`);
  }
}
