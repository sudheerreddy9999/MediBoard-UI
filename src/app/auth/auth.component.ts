import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../shared/auth.service';
import { ModalComponent } from '../components/modal/modal.component';
import { environment } from '../../environments/environment';
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
  imports: [CommonModule, FormsModule, FontAwesomeModule, ModalComponent,MatIconModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'], // Corrected typo here
})
export class AuthComponent implements OnInit {
  private apiUrl:string = environment.apiBaseUrl
  @Input() messageFromParent: string = '';
  @Input() typeOfuser: string = '';
  @Output() userLoggedIn = new EventEmitter<any>();
  @Output() onCloseButtonClicked = new EventEmitter<boolean>();
  userName: string = 'sudheerjanga9999@gmail.com';
  password: string = 'Sudheer@123';
  first_name: string = '';
  last_name: string = '';
  mobile_number: string = '';
  faEnvelope = faEnvelope;
  faLock = faLock;
  faPhone = faPhone;
  faUser = faUser;
  isUserLogin = false;
  authMessage = "Don't have account signUp";
  authIsSignup = false;
  openModalComponnet: boolean = false;
  modalMessage: string = 'Success';
  typeOfModal: string = 'success';
  

  ngOnInit(): void {
    if (this.messageFromParent === 'Login') {
      this.isUserLogin = true;
      this.authMessage = "Don't have account signUp";
    } else if (this.messageFromParent === 'Signup') {
      this.authIsSignup = true;
      this.isUserLogin = true;
      this.authMessage = "Already a user Login"
    }
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

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
        .post(`${this.apiUrl}/add`, body, { headers: headers })
        .subscribe({
          next: (response) => {
            console.log('Api response is', response);
            this.authService.login(true);
          },
          error: (error) => {
            console.error('API Error:', error);
            this.openModalComponnet = true;
            this.modalMessage = `${error.error.message} try again `;
            this.typeOfModal = 'failure';
          },
          complete: () => {
            console.log('API request completed successfully.');
          },
        });
    } else if (this.typeOfuser === 'Patient') {
      const headers = new HttpHeaders({
        email: this.userName,
        password: this.password,
        'Content-Type': 'application/json',
      });
      this.http
        .get<AuthResponse>(`${this.apiUrl}/auth`, { headers: headers })
        .subscribe({
          next: (response) => {
            console.log('Api response is', response);
            const data = response.data;
            setTimeout(() => {
              this.userLoggedIn.emit(data); // Emit the data (assuming you're using EventEmitter)
            }, 3000);
            this.openModalComponnet = true;
            localStorage.setItem('mediboard', JSON.stringify(data)); // Store the data in localStorage
            this.modalMessage = 'Login Success';
            this.typeOfModal = 'success';
          },
          error: (error) => {
            console.error('API Error:', error); // Handle the error
            this.openModalComponnet = true;
            this.modalMessage = `${error.error.message} try again `;
            this.typeOfModal = 'failure';
          },
          complete: () => {
            console.log('API request completed successfully.'); // Optional: Handle completion if needed
          },
        });
    } else if (this.typeOfuser === 'Employee') {
      const headers = new HttpHeaders({
        email: this.userName,
        password: this.password,
        'Content-Type': 'application/json',
      });
      this.http
        .get<AuthResponse>(`${this.apiUrl}/employee/auth`, { headers: headers })
        .subscribe({
          next: (response) => {
            console.log('Api response is', response);
            const data = response.data;
            this.openModalComponnet = true;
            this.modalMessage = 'Login Success';
            this.typeOfModal = 'success';
            setTimeout(() => {
              this.userLoggedIn.emit(data); // Emit the data (assuming you're using EventEmitter)
            }, 2000);
            localStorage.setItem('mediboard', JSON.stringify(data)); // Store the data in localStorage
            this.authService.login(true);
          },
          error: (error) => {
            console.error('API Error:', error); // Handle the error
            this.openModalComponnet = true;
            this.modalMessage = `${error.error.message} try again `;
            this.typeOfModal = 'failure';
          },
          complete: () => {
            console.log('API request completed successfully.'); // Optional: Handle completion if needed
          },
        });
    }
  }
  authToggle() {
    console.log("I git Toggled")
    this.authIsSignup = !this.authIsSignup;
    if (this.authIsSignup) {
      this.messageFromParent = 'Sign Up'
      this.authMessage = 'Already have an account Login';
    } else {
      this.messageFromParent = 'Login'
      this.authMessage = "Don't have account signUp";
    }
  }
  handleCloseEmitModal(closeModal: boolean) {
    this.openModalComponnet = closeModal;
  }
  closeAuthForm(){
    this.onCloseButtonClicked.emit(false);
  }
}
