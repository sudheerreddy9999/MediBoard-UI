import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { DoctorComponent } from '../employee/doctors/doctors.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    DoctorComponent,
    LoaderComponent,
    ModalComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  currentComponent = '';
  ActivateLoader: boolean = false;
  openModal: boolean = false;
  router: any;
  constructor(private authService: AuthService) {}
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
        return; // Exit early if token is not available
      }
      this.currentComponent = 'doctors';
      this.ActivateLoader = false;
    }
  }
}
