import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '..//../services/api.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  providers: [ApiService]
})
export class TransactionComponent {
  transactionForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.transactionForm = this.fb.group({
      date: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        const transactionData = {
          amount: this.transactionForm.value.amount,
          transaction_type: { id: this.transactionForm.value.type },
          at_date: this.transactionForm.value.date,
          user_id: userId
        };

        this.apiService.insertUserTransaction(transactionData).subscribe({
          next: (response) => {
            console.log('Transaction successful:', response);
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error('Transaction failed:', error);
            this.errorMessage = 'Transaction failed';
          }
        });
      } else {
        this.errorMessage = 'User ID is missing';
      }
    }
  }
}
