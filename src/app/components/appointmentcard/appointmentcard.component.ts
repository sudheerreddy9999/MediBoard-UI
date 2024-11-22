import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';
@Component({
  selector: 'app-appointmentcard',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule,CalendarModule,ErrorComponent],
  templateUrl: './appointmentcard.component.html',
  styleUrl: './appointmentcard.component.css',
})
export class AppointmentcardComponent implements OnInit {
  @Input() appointmentData: any;
  filteredAppointments: any = [];
  noRecordsFound: boolean = false;
  selectedDate: any = null;
  searchTerm: string = '';
  ngOnInit(): any {
    this.filteredAppointments = this.appointmentData.userAppointments;
  }

  filterAppointments() {
    this.noRecordsFound = false;
    this.selectedDate = null
    if (this.searchTerm) {
      this.filteredAppointments = this.appointmentData.userAppointments.filter(
        (appointment: any) =>
          appointment.appointment_id.toString().includes(this.searchTerm.trim())
      );
      if (this.filteredAppointments.length == 0) {
        this.noRecordsFound = true;
      }
    } else {
      this.filteredAppointments = this.appointmentData.userAppointments;
    }
  }
  filterAppointmentsByDate() {
    this.noRecordsFound = false;
    if (this.selectedDate) {
      this.filteredAppointments = this.appointmentData.userAppointments.filter(
        (x: any) => x.slot_date === this.selectedDate
      );
      if (this.filteredAppointments.length === 0) {
        this.noRecordsFound = true;
      }
    } else {
      this.filteredAppointments = this.appointmentData.userAppointments;
    }
  }
}
