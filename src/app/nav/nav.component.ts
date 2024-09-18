import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from '../auth/auth.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import {
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { DoctorComponent } from '../doctor/doctor.component';
import { EmployeeComponent } from '../employee/employee.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

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
  typeOfUser: string = 'Patient';
  userInfo: any = '';
  isLoginButtonClicked = false;
  parentMessage: string = 'Hello from Parent!';
  currentRoute: string = '';

  onUserLoggedIn(user: any) {
    this.userInfo = user;
    this.isLoginButtonClicked = false;
  }
  onCloseButtonClicked(event:any){
    this.isLoginButtonClicked=event
  }

  constructor(private router: Router, private route: ActivatedRoute,private AuthService:AuthService) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedData: string = localStorage.getItem('mediboard') || '';
      if (storedData) {
        this.userInfo = JSON.parse(storedData);
      }
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          // Get the full URL path
          const fullUrl = this.router.url;
          console.log('Full URL:', fullUrl); // Should give you '/employee'

          // Store the route in a variable
          const segment = fullUrl.split('/');
          this.typeOfUser = segment[1] || 'Patient';
        });
    }
  }
  onUserSelectChange(value: any) {
    this.isLoginButtonClicked = false;
    this.typeOfUser = value;
    if (this.typeOfUser === 'Patient') {
      this.router.navigate(['/']);
    } else if (this.typeOfUser === 'Doctor') {
      this.router.navigate(['/Doctor']);
    } else if (this.typeOfUser === 'Employee') {
      this.router.navigate(['/Employee']);
    }
  }
  loginButtonClicked(authType: string) {
    console.log(authType)
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
        this.parentMessage = 'Signup';
      }
    }
  }
  logoutButtonClicked() {
    localStorage.removeItem('mediboard');
    this.AuthService.login(false);
    this.userInfo = '';
  }
}
