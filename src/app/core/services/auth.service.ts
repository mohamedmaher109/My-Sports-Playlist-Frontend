import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../../shared/models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  // Login and get token
  login(username: string, password: string): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/login`, { username, password });
  }

  // Register user
  register(username: string, password: string,confirmPassword:string): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/register`, { username, password, confirmPassword });
  }

  // Store JWT token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Get JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Clear JWT token
  logout(): void {
    localStorage.removeItem('token');
  }
isLoggedIn(): boolean {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('token') != null;
  }
  return false;
}
}
