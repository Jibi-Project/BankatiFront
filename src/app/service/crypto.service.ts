import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private apiUrl = 'http://localhost:1015/api/crypto/convert';
  private baseUrl = 'http://localhost:1015/api/crypto';


  constructor(private http: HttpClient) {}

  convertCrypto(request: any): Observable<any> {
    return this.http.post(this.apiUrl, request);

  }
  buyCrypto(request: { userId: number; crypto: string; fiat: string; amount: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/buy`, request);
  }

  sellCrypto(request: { userId: number; crypto: string; fiat: string; amount: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/sell`, request);
  }
  
  
}
