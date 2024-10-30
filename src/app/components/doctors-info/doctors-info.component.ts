import { Component } from '@angular/core';
import { DisplayDoctorsComponent } from '../display-doctors/display-doctors.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AddEditComponent } from '../../appointments/book-appointments/add-edit.component';

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
export class DoctorsInfoComponent {
  constructor(private router: Router) {}
  enablecloseButton: boolean = false;
  enableBookAppointment: boolean = false;
  selectedDoctorData = null;
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
