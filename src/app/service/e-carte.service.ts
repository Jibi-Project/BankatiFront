import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ECarteService {
  private BASE_URL = "http://localhost:8222";

  constructor(private http: HttpClient) { }

  genererECarte(email: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/ecarte/generer`, { email });
  }

  private apiUrl = 'http://localhost:8222/api/ecarte/by-email';


  getECarteByEmail(email: string): Observable<any> {
    return this.http.post('http://localhost:8222/api/ecarte/by-email', { email });
  }
  
}
