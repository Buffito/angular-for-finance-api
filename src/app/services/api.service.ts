import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5000'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  register(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  logout(): Observable<any>{
    return this.http.post(`${this.apiUrl}/logout`, {
      headers: { 'Authorization': 'Bearer '+  this.authService.getToken()} 
    });
  }

  getUserTransactions(userId: number):Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions/user/${userId}`, {
      headers: { 'Authorization': 'Bearer '+  this.authService.getToken()} 
    });
  }

  insertUserTransaction(userData: { transaction_type: { id: number }; amount: number; user_id: number }):Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, userData, {
      headers: { 'Authorization': 'Bearer '+  this.authService.getToken()} 
    });
  }
}