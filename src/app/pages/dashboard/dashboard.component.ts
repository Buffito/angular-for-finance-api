import { Component, OnInit } from '@angular/core';
import { ApiService } from '..//../services/api.service';
import { AuthService } from '..//../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
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
