import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ECarteService {
  private BASE_URL = "http://localhost:1011";

  constructor(private http: HttpClient) { }

  getTransactionsPerDay(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`http://localhost:1011/api/transactions/per-day`);
  }

  getAverageTransactionAmount(): Observable<number> {
    return this.http.get<number>(`http://localhost:1011/api/transactions/average-amount`);
  }

  genererECarte(email: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/ecarte/generer`, { email });
  }



  getECarteByEmail(email: string): Observable<any> {
    return this.http.post('http://localhost:1011/api/ecarte/by-email', { email });
  }

  private apiUrl = 'http://localhost:1011/api/ecarte/transaction';


  doTransaction(payload: any): Observable<string> {
    return this.http.post<string>(this.apiUrl, payload);
  }



  getTransactionsBySenderId(senderId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:1011/api/transactions/by-sender`, {
      params: { senderId }
    });
  }



}
