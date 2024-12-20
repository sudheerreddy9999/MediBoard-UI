import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../shared/auth.service';
import { ModalComponent } from '../components/modal/modal.component';
import { LoaderComponent } from '../components/loader/loader.component';
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
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ModalComponent,
    MatIconModule,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'], // Corrected typo here
})
export class AuthComponent implements OnInit {
  private apiUrl: string = environment.apiBaseUrl;
  @Input() messageFromParent: string = '';
  @Input() typeOfuser: string = '';
  @Output() userLoggedIn = new EventEmitter<any>();
  @Output() onCloseButtonClicked = new EventEmitter<boolean>();
  OpenLoader: boolean = false;
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
  isEmployeeLogin = false;
  modalMessage: string = 'Success';
  typeOfModal: string = 'success';
  authLeftImage ='images/loginsideImg.webp'
  profileForm = new FormGroup({
    first_name: new FormControl('sudheer', [
      Validators.required,
      Validators.minLength(2), // Ensure at least 2 characters
      Validators.pattern('^[a-zA-Z ]+$'), // Allow only alphabets and spaces
    ]),
    last_name: new FormControl('janga', [
      Validators.required,
      Validators.minLength(2), // Ensure at least 2 characters
      Validators.pattern('^[a-zA-Z ]+$'), // Allow only alphabets and spaces
    ]),
    userName: new FormControl('sudheerjanga9999@gmail.com', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'),
    ]),
    password: new FormControl(
      'Sudheer@123',
      this.authIsSignup
        ? [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
          ]
        : [Validators.required]
    ),
    mobile_number: new FormControl('6303896539', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),
  });
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.selectedEmployeeDropDown$.subscribe((message: boolean) => {
      this.isEmployeeLogin = message;
      if(this.isEmployeeLogin){
        this.authLeftImage='images/employeeAuthImage.webp'
      }
    });
    if (this.typeOfuser === 'Employee') {
      this.profileForm.patchValue({
        userName: 'admin@gmail.com',
        password: 'admin@123',
      });
    }
    if (this.messageFromParent === 'Login') {
      this.isUserLogin = true;
      this.authMessage = "Don't have account signUp";
    } else if (this.messageFromParent === 'Signup') {
      this.authIsSignup = true;
      this.isUserLogin = true;
      this.authMessage = 'Already a user Login';
    }
  }
  onSubmit() {
    if (this.authIsSignup) {
      if (this.profileForm.invalid) {
        this.profileForm.markAllAsTouched();
        return;
      }
      this.OpenLoader = true;
      const body = {
        email: this.profileForm.value.userName,
        password: this.profileForm.value.password,
        first_name: this.profileForm.value.first_name,
        last_name: this.profileForm.value.last_name,
        mobile_number: this.profileForm.value.mobile_number,
      };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .post(`${this.apiUrl}/user/add`, body, { headers: headers })
        .subscribe({
          next: (response) => {
            this.OpenLoader = false;
              const data = response;
              setTimeout(() => {
                this.userLoggedIn.emit(data); // Emit the data (assuming you're using EventEmitter)

                this.authService.login(true);
              }, 1000);
              this.openModalComponnet = true;
              localStorage.setItem('mediboard', JSON.stringify(data));
              this.modalMessage = 'Login Success';
              this.typeOfModal = 'success';
          },
          error: (error) => {
            console.error('API Error:', error);
            this.openModalComponnet = true;
            this.modalMessage = `${error.error.message} try again `;
            this.OpenLoader = false;
            this.typeOfModal = 'failure';
          },
          complete: () => {
            console.log('API request completed successfully.');
          },
        });
    } else if (!this.authIsSignup) {
      // For login, validate only email and password
      const emailControl = this.profileForm.get('userName');
      const passwordControl = this.profileForm.get('password');

      if (emailControl?.invalid || passwordControl?.invalid) {
        emailControl?.markAsTouched();
        passwordControl?.markAsTouched();
        return;
      }
      this.OpenLoader = true;
      if (this.typeOfuser === 'Patient') {
        const headers = new HttpHeaders({
          email: this.profileForm?.value.userName || '',
          password: this.profileForm?.value.password || '',
          'Content-Type': 'application/json',
        });
        this.http
          .get<AuthResponse>(`${this.apiUrl}/user/auth`, { headers: headers })
          .subscribe({
            next: (response) => {
              this.OpenLoader = false;
              const data = response.data;
              setTimeout(() => {
                this.userLoggedIn.emit(data); // Emit the data (assuming you're using EventEmitter)

                this.authService.login(true);
              }, 1000);
              this.openModalComponnet = true;
              localStorage.setItem('mediboard', JSON.stringify(data));
              this.modalMessage = 'Login Success';
              this.typeOfModal = 'success';
            },
            error: (error) => {
              this.OpenLoader = false;
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
          email: this.profileForm?.value.userName || '',
          password: this.profileForm?.value.password || '',
          'Content-Type': 'application/json',
        });
        this.http
          .get<AuthResponse>(`${this.apiUrl}/employee/auth`, {
            headers: headers,
          })
          .subscribe({
            next: (response) => {
              this.OpenLoader = false;
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
              this.OpenLoader = false;
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
  }

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
            const data = response.data;
            setTimeout(() => {
              this.userLoggedIn.emit(data);
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
    this.authIsSignup = !this.authIsSignup;
    if (this.authIsSignup) {
      this.messageFromParent = 'Sign Up';
      this.authMessage = 'Already have an account Login';
      this.authLeftImage ='images/userLeftImage.jpeg'
    } else {
      this.messageFromParent = 'Login';
      this.authMessage = "Don't have account signUp";
      this.authLeftImage ='images/loginsideImg.webp'

    }
  }
  handleCloseEmitModal(closeModal: boolean) {
    this.openModalComponnet = closeModal;
  }
  closeAuthForm() {
    this.onCloseButtonClicked.emit(false);
  }
}
