import { Component,EventEmitter,Input,OnInit,Output } from '@angular/core';
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
interface AuthResponse {
  message: string;
  data: {
    token: string;
    userId: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
  };
}
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'], // Corrected typo here
})
export class AuthComponent implements OnInit {
  @Input() messageFromParent: string = '';
  @Input() typeOfuser: string = '';
  @Output() userLoggedIn = new EventEmitter<any>();
  userName: string = 'sudheerjanga9999@gmail.com';
  password: string = 'Sudheer@123';
  first_name: string = '';
  last_name: string = '';
  mobile_number: string = '';
  faEnvelope = faEnvelope;
  faLock = faLock;
  faPhone = faPhone;
  faUser = faUser;
  isUserLogin=false;
  authMessage = "Don't have account signUp";
  authIsSignup = false;
  apiUrl = 'http://localhost:3000';

  ngOnInit(): void{
    console.log()
    if(this.messageFromParent ==='Login'){
      this.isUserLogin = true;
    } else if(this.messageFromParent ==='Patient Signup'){
      this.authIsSignup = true;
      this.isUserLogin = true;
    }
  }

  constructor(private http: HttpClient) {}

  submitCredentials() {
    if (this.authIsSignup && this.typeOfuser ==='patient') {
      const body = {
        email: this.userName,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        mobile_number: this.mobile_number,
      };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .post(`${this.apiUrl}/employee/auth`, body, { headers: headers }).subscribe({
          next: (response) => {
            console.log('Api response is', response);
          },
          error: (error) => {
            console.error('API Error:', error); // Handle the error
          },
          complete: () => {
            console.log('API request completed successfully.'); // Optional: Handle completion if needed
          }
        })
    } else if(this.typeOfuser ==='Patient') {
      const headers = new HttpHeaders({
        email: this.userName,
        password: this.password,
        'Content-Type': 'application/json',
      });
      this.http.get<AuthResponse>(`${this.apiUrl}/auth`, { headers: headers }).subscribe({
        next: (response) => {
          console.log('Api response is', response);
          const data = response.data;
          this.userLoggedIn.emit(data); // Emit the data (assuming you're using EventEmitter)
          localStorage.setItem('mediboard', JSON.stringify(data)); // Store the data in localStorage
        },
        error: (error) => {
          console.error('API Error:', error); // Handle the error
        },
        complete: () => {
          console.log('API request completed successfully.'); // Optional: Handle completion if needed
        }
      })
      
    }
    else if(this.typeOfuser==='Employee'){
      const headers = new HttpHeaders({
        email: this.userName,
        password: this.password,
        'Content-Type': 'application/json',
      });
      this.http.get<AuthResponse>(`${this.apiUrl}/employee/auth`, { headers: headers }).subscribe({
        next: (response) => {
          console.log('Api response is', response);
          const data = response.data;
          this.userLoggedIn.emit(data); // Emit the data (assuming you're using EventEmitter)
          localStorage.setItem('mediboard', JSON.stringify(data)); // Store the data in localStorage
        },
        error: (error) => {
          console.error('API Error:', error); // Handle the error
        },
        complete: () => {
          console.log('API request completed successfully.'); // Optional: Handle completion if needed
        }
      })
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
