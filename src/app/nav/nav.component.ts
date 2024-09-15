import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from '../auth/auth.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DoctorComponent } from '../doctor/doctor.component';
import { EmployeeComponent } from '../employee/employee.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FontAwesomeModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    AuthComponent,
    DoctorComponent,
    EmployeeComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  typeOfUser:string = 'Patient';
  userInfo: any = '';
  isLoginButtonClicked = false;
  parentMessage: string = 'Hello from Parent!';

  onUserLoggedIn(user: any) {
    this.userInfo = user;
    this.isLoginButtonClicked=false;

  }

  constructor(private router: Router) {}
  ngOnInit(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedData: string = localStorage.getItem('mediboard') || '';
    if (storedData) {
      this.userInfo = JSON.parse(storedData);
    }
  }
}


  onUserSelectChange(value: any) {
    this.isLoginButtonClicked = false;
    this.typeOfUser = value;
    if (this.typeOfUser === 'Patient') {
      this.router.navigate(['/']);
    } else if (this.typeOfUser === 'Doctor') {
      this.router.navigate(['/doctor']);
    } else if (this.typeOfUser === 'Employee') {
      this.router.navigate(['/employee']);
    }
  }
  loginButtonClicked(authType: string) {
    this.isLoginButtonClicked = !this.isLoginButtonClicked;
    if (this.isLoginButtonClicked) {
      if (authType === 'Login') {
        if (this.typeOfUser === 'Patient') {
          this.parentMessage = 'Login';
        } else if (this.typeOfUser === 'Doctor') {
          this.parentMessage = 'Doctor Login';
        } else if (this.typeOfUser === 'Employee') {
          this.parentMessage = 'Employee Login';
        }
      } else {
        this.parentMessage = 'Patient Signup';
      }
    }
  }
  logoutButtonClicked(){
    localStorage.removeItem('mediboard');
    this.userInfo = '';
  }
}
