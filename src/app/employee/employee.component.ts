import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { EmployeeDoctorComponent } from '../employee/doctors/doctors.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { ModalComponent } from '../components/modal/modal.component';
import { InfoCardComponent } from '../components/info-card/info-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    EmployeeDoctorComponent,
    LoaderComponent,
    ModalComponent,
    InfoCardComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  currentComponent = '';
  ActivateLoader: boolean = false;
  openModal: boolean = false;

  BoxesInfo = [
    {
      "name": "Doctors",
      "image": "  images/schedulr.png",
      "heading": "Doctors",
      "subHeading": "Manage and Handle Appointments",
      "description": "Effortlessly manage doctor schedules, patient appointments, and availability.",
      "hoverMessage": "Login to access the doctor management dashboard and streamline appointment handling."
    },
    {
      "name": "Patients",
      "image": "https://as2.ftcdn.net/v2/jpg/03/08/73/55/1000_F_308735580_GtnBwk3extfEJiSlIYnV0s91GGPk1SK8.jpg",
      "heading": "Patients",
      "subHeading": "Manage Patient Records",
      "description": "Easily track and manage patient information, history, and appointments.",
      "hoverMessage": "Login to access the patient management dashboard and streamline healthcare services."
    },
    {
      "name": "Employees",
      "image": "https://cdn-icons-png.freepik.com/256/994/994170.png?semt=ais_hybrid",
      "heading": "Employees",
      "subHeading": "Manage Employee Records",
      "description": "Efficiently handle employee profiles, roles, and schedules.",
      "hoverMessage": "Login to access the employee management dashboard and oversee workforce operations seamlessly."
    }
  ]
  
  router: any;
  constructor(private authService: AuthService, private route: Router) {}
  toggleComponnet(componnet: string) {
    this.currentComponent = componnet;
  }
  ngOnInit(): void {
    this.ActivateLoader = true;
    this.authService.employeeLoginStatus$.subscribe((status) => {
      if (status === true) {
        this.currentComponent = 'doctors';
        this.ActivateLoader = false;
      } else {
        this.currentComponent = '';
        this.ActivateLoader = false;
      }
    });
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedData = localStorage.getItem('mediboard');
      if (!storedData) {
        console.warn('No token found, cannot fetch doctors.');
        return;
      }
      this.currentComponent = 'doctors';
      this.ActivateLoader = false;
    }
  }
  handleSelectedBox(heading:string){
    if(heading =="Doctors") this.route.navigate(['/employee/doctors'])
  }
}