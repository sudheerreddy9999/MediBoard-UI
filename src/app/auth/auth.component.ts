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
    if(this.messageFromParent ==='Login'){
      this.isUserLogin = true;
    } else if(this.messageFromParent ==='Patient Signup'){
      this.authIsSignup = true;
      this.isUserLogin = true;
    }
  }

  constructor(private http: HttpClient) {}

  submitCredentials() {
    if (this.authIsSignup) {
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
        .post(`${this.apiUrl}/employee/auth`, body, { headers: headers })
        .subscribe(
          (response) => {
            console.log(response)
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
      this.http.get<AuthResponse>(`${this.apiUrl}/auth`, { headers: headers }).subscribe(
        (response) => {
          console.log('Api response is ', response);
          const data = response.data;
          this.userLoggedIn.emit(data);
          localStorage.setItem('mediboard', JSON.stringify(data));
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
