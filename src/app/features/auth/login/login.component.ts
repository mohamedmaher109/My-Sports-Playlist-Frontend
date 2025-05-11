import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
//import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],//HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/matches']);
    }
  }
  onSubmit(): void {
  this.authService.login(this.username, this.password).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.data);
      this.router.navigate(['/matches']);
    },
    error: () => alert('Invalid credentials')
  });
  }
}
