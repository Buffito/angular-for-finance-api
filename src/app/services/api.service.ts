import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5000'; 

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/login`, credentials, { headers })
    .pipe(
      tap((response: any) => {
        if (response.access_token) {
          sessionStorage.setItem('authToken', response.access_token);  
        }
        if (response.id) {
          sessionStorage.setItem('userId', response.id);  
        }
      })
    );
  }

  register(userData: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/register`, userData, { headers });
  }

  getUserTransactions(userId: number):Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/transactions/user/${userId}`, { headers });
  }

  insertUserTransaction(transactionData: { amount: number, transaction_type: { id: number }, user_id: string }): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/transactions`, transactionData, { headers });
  }
}