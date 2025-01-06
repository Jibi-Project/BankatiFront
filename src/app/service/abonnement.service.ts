import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbonnementsService {
  private baseUrl = 'http://localhost:1011'; // Base URL for the backend API

  constructor(private http: HttpClient) {}

  /**
   * Add a recurring payment
   * @param data - Object containing subscription details
   * @returns Observable<any>
   */
  addRecurringPayment(data: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/recurring-payment/add`, data, { responseType: 'text' });
  }


  /**
   * Get all recurring payments
   * @returns Observable<any>
   */
  getAllRecurringPayments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recurring-payment/all`);
  }

  /**
   * Delete a recurring payment
   * @param id - ID of the recurring payment to delete
   * @returns Observable<any>
   */
  deleteRecurringPayment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recurring-payment/delete/${id}`);
  }
}
