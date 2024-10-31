import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { AuthComponent } from '../../auth/auth.component';
@Component({
  selector: 'app-users-info',
  standalone: true,
  imports: [MatIconModule, MatIcon, CommonModule, AuthComponent],
  templateUrl: './users-info.component.html',
  styleUrl: './users-info.component.css',
})
export class UsersInfoComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  loggedInUser: boolean = false;
  enableAuthComp: boolean = false;
  allBoxesInfo = [
    {
      name: 'Appointments',
      image: 'images/schedulr.png',
      heading: 'View',
      subHeading: 'Schedule Appointments',
      description: 'Book, view, and manage your appointments effortlessly.',
      hoverMessage:
        'Login to access your appointment dashboard and easily manage all upcoming appointments.',
    },
    {
      name: 'Contact Your Doctor',
      image:
        'https://as2.ftcdn.net/v2/jpg/03/08/73/55/1000_F_308735580_GtnBwk3extfEJiSlIYnV0s91GGPk1SK8.jpg',
      heading: 'Connect',
      subHeading: 'Reach Out for Assistance',
      description:
        'Easily contact your doctor for any queries or follow-ups regarding your health.',
      hoverMessage:
        'Login to directly connect with your doctor for questions, follow-ups, and support.',
    },
    {
      name: 'Previous Records',
      image:
        'https://cdn-icons-png.freepik.com/256/994/994170.png?semt=ais_hybrid',
      heading: 'Records',
      subHeading: 'See Your Previous Records',
      description:
        'Easily access and review your past appointments and records for better planning.',
      hoverMessage:
        'Login to view your complete medical history and stay on top of your records.',
    },
    {
      name: 'About Us',
      image:
        'https://ideogram.ai/assets/progressive-image/balanced/response/VjCL3CJlTyyKKEqh2pUFtQ',
      heading: 'About Us',
      subHeading: 'Learn More About Who We Are',
      description:
        'Discover our mission, values, and the dedicated team behind your healthcare experience.',
      hoverMessage:
        'Login to learn more about our team and our commitment to your health.',
    },
  ];

  ngOnInit(): void {
    this.authService.employeeLoginStatus$.subscribe((status) => {
      if (status === true) {
        this.loggedInUser = true;
      } else if (status === false) {
        this.loggedInUser = false;
      }
    });
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('mediboard') || '';
      if (data) {
        this.loggedInUser = true;
      }
    }
  }
  userPrefClicked(type: string) {
    if (type === 'Connect') this.router.navigate(['Patient/Doctors']);
    if (type === 'View') this.router.navigate(['Patient/Appointments']);
  }
  loginClick() {
    this.enableAuthComp = true;
  }
  onCloseButtonClicked(event: any) {
    this.enableAuthComp = false;
  }
  onUserLoggedIn(event: any) {
    this.enableAuthComp = false;
  }
}
