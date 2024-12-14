import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  
}
