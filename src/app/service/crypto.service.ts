import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private apiUrl = 'http://localhost:1015/api/crypto/convert';

  constructor(private http: HttpClient) {}

  convertCrypto(request: any): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }
}
