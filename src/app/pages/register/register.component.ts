import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ApiService } from '..//../services/api.service';
import {} from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, 
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule],
  providers: [ApiService]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.apiService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']); 
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.errorMessage = 'Registration failed. Try again.';
        }
      });
    }
  }
}