import { Component, OnInit } from '@angular/core';
import { ApiService } from '..//../services/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  transactions: any[] = [];
  hasTransactions = false;
  countdown: number = 600;
  interval: any;
  formattedTime: string = '';

  constructor(private apiService: ApiService, private router: Router) {
    this.updateFormattedTime();
    this.startCountdown();
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    var userId = Number(sessionStorage.getItem('userId'));
    if (isNaN(userId))
      userId = 0;

    this.apiService.getUserTransactions(userId).subscribe((data: any) => {
      this.transactions = data;
      this.hasTransactions = this.transactions.length > 0;
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  // added this so that we can see that the access token is valid for 10 minutes
  // may add refresh to it
  startCountdown() {
    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
        this.updateFormattedTime();
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  updateFormattedTime() {
    const minutes = Math.floor(this.countdown / 60);
    const seconds = this.countdown % 60;
    this.formattedTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}