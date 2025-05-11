import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
//import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],// HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers:[AuthService]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    this.authService.register(this.username, this.password, this.confirmPassword)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
        },
        error: () => alert('Registration failed')
      });
  }
}