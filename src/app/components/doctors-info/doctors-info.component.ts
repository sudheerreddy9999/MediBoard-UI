import { Component,OnInit } from '@angular/core';
import { DisplayDoctorsComponent } from '../display-doctors/display-doctors.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AddEditComponent } from '../../appointments/book-appointments/add-edit.component';
import { environment } from '../../../environments/environment';

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
  ],
  templateUrl: './doctors-info.component.html',
  styleUrl: './doctors-info.component.css',
})
export class DoctorsInfoComponent implements OnInit {
  constructor(private router: Router,private http:HttpClient) {}
  enablecloseButton: boolean = false;
  enableBookAppointment: boolean = false;
  selectedDoctorData = null;
  apiUrl =environment.apiBaseUrl
  ngOnInit(): void {
    console.log("I am In it")
    this.http.get(`${this.apiUrl}/appointments/user`).subscribe({
      next:(response)=>{
        console.log(response);
      }
    })
  }
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
