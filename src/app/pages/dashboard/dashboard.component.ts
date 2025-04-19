import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  transactions: any[] = [];
  hasTransactions = false;
  displayedColumns: string[] = ['date', 'amount', 'type'];
  interval: any;
  formattedTime: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    let userId = Number(sessionStorage.getItem('userId'));
    if (isNaN(userId)) {
      userId = 0;
    }

    this.apiService.getUserTransactions(userId).subscribe((data: any) => {
      this.transactions = data;
      this.hasTransactions = this.transactions.length > 0;
    });
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}