import { Component, OnInit } from '@angular/core';
import { ApiService } from '..//../services/api.service';
import { AuthService } from '..//../services/auth.service';
import { CommonModule } from '@angular/common';
import {} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, 
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  transactions: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService){}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(){
    this.apiService.getUserTransactions(this.authService.getUserId()).subscribe((data: any) => {
      this.transactions = data;
    });
  }
}
