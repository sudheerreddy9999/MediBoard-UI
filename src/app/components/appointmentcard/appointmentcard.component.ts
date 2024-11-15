import { Component,Input,OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-appointmentcard',
  standalone: true,
  imports: [MatIconModule,CommonModule,FormsModule],
  templateUrl: './appointmentcard.component.html',
  styleUrl: './appointmentcard.component.css'
})
export class AppointmentcardComponent implements OnInit {
  @Input() appointmentData: any;
  filteredAppointments: any = [];
  noRecordsFound:boolean = false;
  searchTerm: string = '';
  ngOnInit(): any {
    console.log(this.appointmentData," Appointment")
    this.filteredAppointments = this.appointmentData.userAppointments;
    console.log(this.filteredAppointments, " filtered Appointments are ");
  }

  filterAppointments() {
    this.noRecordsFound = false;
    if (this.searchTerm) {
      this.filteredAppointments = this.appointmentData.userAppointments.filter((appointment: any) =>
        appointment.appointment_id.toString().includes(this.searchTerm.trim())
      );
      if(this.filteredAppointments.length == 0){
        this.noRecordsFound = true;
        }
      console.log(this.filteredAppointments," After seeach is ")
    } else {
      this.filteredAppointments = this.appointmentData.userAppointments; 
    }
  }
}
