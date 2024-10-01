import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from '../auth/auth.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { DropdownModule } from 'primeng/dropdown';
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

interface Country {
  name: string;
  code: string;
  image:string;
}

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
    DropdownModule,
    FormsModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  typeOfUser: string = 'this.selectedUser';
  userInfo: any = '';
  isLoginButtonClicked = false;
  parentMessage: string = 'Hello from Parent!';
  currentRoute: string = '';
  countries: Country[]; // Array to hold the countries list
  selectedUser: Country | null ={
    "name": "Patient",
    "code": "US",
    "image": "https://thumbs.dreamstime.com/b/portrait-young-handsome-man-white-shirt-outdoor-portrait-young-handsome-man-white-shirt-outdoor-nice-appearance-131934608.jpg"
}


  onUserLoggedIn(user: any) {
    this.userInfo = user;
    this.isLoginButtonClicked = false;
  }
  onCloseButtonClicked(event:any){
    this.isLoginButtonClicked=event
  }

  constructor(private router: Router, private route: ActivatedRoute,private AuthService:AuthService) {
    this.countries = [
      { name: 'Patient', code: 'US',image:"https://thumbs.dreamstime.com/b/portrait-young-handsome-man-white-shirt-outdoor-portrait-young-handsome-man-white-shirt-outdoor-nice-appearance-131934608.jpg" },
      { name: 'Doctor', code: 'CA',image:"https://img.freepik.com/premium-vector/doctor-icon-avatar-white_136162-58.jpg" },
      { name: 'Employee', code: 'GB',image:"https://w7.pngwing.com/pngs/429/434/png-transparent-computer-icons-icon-design-business-administration-admin-icon-hand-monochrome-silhouette-thumbnail.png"}]
  }
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
  onCountrySelect(){
    this.isLoginButtonClicked = false;
    if (this.selectedUser?.name === 'Patient') {
      this.router.navigate(['/']);
      this.AuthService.userTypeEmployee(false);
    } else if (this.selectedUser?.name === 'Doctor') {
      this.router.navigate(['/Doctor']);
      this.AuthService.userTypeEmployee(false);
    } else if (this.selectedUser?.name === 'Employee') {
      this.router.navigate(['/Employee']);
      this.isLoginButtonClicked = true;
      this.AuthService.userTypeEmployee(true);
    }else{
      this.selectedUser={
        "name": "Patient",
        "code": "US",
        "image": "https://thumbs.dreamstime.com/b/portrait-young-handsome-man-white-shirt-outdoor-portrait-young-handsome-man-white-shirt-outdoor-nice-appearance-131934608.jpg"
    }
      this.router.navigate(['/']);
    }
  }
  logoutButtonClicked() {
    localStorage.removeItem('mediboard');
    this.AuthService.login(false);
    this.userInfo = '';
  }
}
