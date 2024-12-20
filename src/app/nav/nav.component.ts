import { Component, OnInit,ElementRef,ViewChild, viewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from '../auth/auth.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { DropdownModule } from 'primeng/dropdown';
import { Location } from '@angular/common';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
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

interface Users {
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
    FormsModule,
    SideNavComponent
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  // typeOfUser: string =  'this.selectedUser'|| 'Patient';
  typeOfUser: string =  'Patient';
  userInfo: any = '';
  isLoginButtonClicked = false;
  parentMessage: string = 'Admin Login';
  currentRoute: string = '';
  isFunctionLoaded =false
  users: Users[] = []; 
  selectedUser: Users | null = this.users[0] || null;
  @ViewChild('usersInfoSection', { static: false }) usersInfoSection!: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute, private AuthService: AuthService,private location:Location) {
    // Initialize the countries array
    this.users = [
      { name: 'Patient', code: 'US', image: "/images/user.png" },
      { name: 'Doctor', code: 'CA', image: "/images/doctor.png" },
      { name: 'Employee', code: 'GB', image: "/images/nurse.png" }
    ];
    // Now you can safely assign the first element of countries to selectedUser
    this.selectedUser = this.users[0];
  }
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedData: string = localStorage.getItem('mediboard') || '';
      if (storedData) {
        this.userInfo = JSON.parse(storedData);
      }else{
        this.isFunctionLoaded =true
      }
      this.AuthService.employeeLoginStatus$.subscribe((status) => {
        if (status === true) {
          this.isFunctionLoaded =false
          this.userInfo = JSON.parse(localStorage.getItem("mediboard") || 'null');
        } else {
        }
      });
      
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          const fullUrl = this.router.url;
          const segment = fullUrl.split('/');
          this.typeOfUser = segment[1] || 'Patient';
          if (this.typeOfUser === 'Doctor') {
            this.selectedUser = this.users[1];
          }
          if (this.typeOfUser === 'Employee') {
            this.selectedUser = this.users[2];
          }
        });
    }
    this.AuthService.logout$.subscribe((status)=>{
      if(status) this.logoutButtonClicked();
    })
  }
  loginButtonClicked(authType: string) {
    this.isLoginButtonClicked = !this.isLoginButtonClicked;
    if (this.isLoginButtonClicked) {
      if (authType === 'Login') {
        this.parentMessage = this.typeOfUser === 'Patient' ? 'Login' : this.typeOfUser + ' Login';
      } else {
        this.parentMessage = 'Signup';
      }
    }
  }
 selectUser(user: any) {
  this.selectedUser = user;
  this.dropdownOpen = false;
  this.isLoginButtonClicked = false;
  if(this.selectedUser?.name==='Patient' ) {
    this.router.navigate(['/Patient']);
    this.AuthService.userTypeEmployee(false);
  }else if (this.selectedUser?.name === 'Doctor') {
    this.router.navigate(['/Doctor']);
    this.AuthService.userTypeEmployee(false);
 } else if (this.selectedUser?.name === 'Employee') {
    this.router.navigate(['/Employee']);
    this.isLoginButtonClicked = true;
    this.AuthService.userTypeEmployee(true);
 } else {
    this.resetToFirstCountry();
 }
}
 
  resetToFirstCountry() {
    this.selectedUser = this.users[0]; // Resets to the first country
}


  logoutButtonClicked() {

    this.isFunctionLoaded =true
    localStorage.removeItem('mediboard');
    this.AuthService.login(false);
    this.userInfo = '';
    this.router.navigate(['/Patient']);
    this.isFunctionLoaded =true
    setTimeout(()=>{
      this.isLoginButtonClicked = !this.isLoginButtonClicked;
    },4000)
  }
  onCloseButtonClicked(event:any){
    this.isLoginButtonClicked=event
  }
  onUserLoggedIn(user: any) {
    this.userInfo = user;
    this.isLoginButtonClicked = false;
    this.isFunctionLoaded =false
  }
  redirectHome(){
    if(this.userInfo.employeeDetails){
      this.router.navigate(['/Employee'])
    }else{
      this.router.navigate(['/Patient'])
    }
  }
}

