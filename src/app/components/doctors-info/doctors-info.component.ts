import { Component } from '@angular/core';
import { DisplayDoctorsComponent } from '../display-doctors/display-doctors.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AddEditComponent } from '../../appointments/book-appointments/add-edit.component';
import { environment } from '../../../environments/environment';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-doctors-info',
  standalone: true,
  imports: [
    AddEditComponent,
    DisplayDoctorsComponent,
    MatIcon,
    MatIconModule,
    CommonModule,
    RouterModule,
    SideNavComponent
  ],
  templateUrl: './doctors-info.component.html',
  styleUrl: './doctors-info.component.css',
})
export class DoctorsInfoComponent   {
  constructor(private router: Router,private http:HttpClient) {}
  enablecloseButton: boolean = false;
  enableBookAppointment: boolean = false;
  selectedDoctorData = null;
  apiUrl =environment.apiBaseUrl
  sideNavContent = [
    {route:"/Patient",image:"images/side-bar/home.png"},
    {route:"/Patient/Appointments",image:"images/side-bar/book.png"},
    {route:"Patient/Records",image:"images/side-bar/info.png"},
    {route:"Patient/Records",image:"images/side-bar/turn-off.png"},
  ]
  handelReturn() {
    this.router.navigate(['Patient']);
  }
  handleAppointmentData(event: any) {
    this.selectedDoctorData = event;
    this.enableBookAppointment = true;
  }
  handleCloseAppointment() {
    this.enableBookAppointment = false;
  }
}
