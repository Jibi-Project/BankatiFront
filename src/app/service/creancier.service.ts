import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreancierService {

  private apiUrl = 'http://localhost:1010/api/creanciers/grouped'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getGroupedCreanciers(): Observable<{ [key: string]: any[] }> {
    return this.http.get<{ [key: string]: any[] }>(this.apiUrl);
  }
}
