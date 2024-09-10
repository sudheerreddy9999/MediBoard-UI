import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLock,
  faPhone,
  faUser,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'], // Corrected typo here
})
export class AuthComponent {
  userName: string = 'sudheerjanga9999@gmail.com';
  password: string = 'sudheer@123';
  first_name: string = '';
  last_name: string = '';
  mobile_number: string = '';
  faEnvelope = faEnvelope;
  faLock = faLock;
  faPhone = faPhone;
  faUser = faUser;
  authMessage = "Don't have account signUp";
  authIsSignup = false;
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  submitCredentials() {
    if (this.authIsSignup) {
      // Define the headers
      const body = {
        email: this.userName,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        mobile_number: this.mobile_number
      };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http.post(`${this.apiUrl}/add`, body, { headers: headers }).subscribe(
        (response) => {
          console.log('User Added response is', response);
        },
        (error) => {
          console.error(`API Error is ${error}`);
        }
      );
    } else {
      const headers = new HttpHeaders({
        email: this.userName,
        password: this.password,
        'Content-Type': 'application/json',
      });
      this.http.get(`${this.apiUrl}/auth`, { headers: headers }).subscribe(
        (response) => {
          console.log('Api response is ', response);
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    }
  }
  authToggle() {
    this.authIsSignup = !this.authIsSignup;
    if (this.authIsSignup) {
      this.authMessage = 'Already have an account Login';
    } else {
      this.authMessage = "Don't have account signUp";
    }
  }
}
