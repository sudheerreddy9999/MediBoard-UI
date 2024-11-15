import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { DatePipe } from '@angular/common';
import { HoursFormat12Pipe } from '../../pipes/hours-format12.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { AppointmentcardComponent } from '../appointmentcard/appointmentcard.component';

@Component({
  selector: 'app-view-appointments',
  standalone: true,
  imports: [MatIcon, MatIconModule, CommonModule, TimeFormatPipe, HoursFormat12Pipe,LoaderComponent,AppointmentcardComponent],
  providers: [DatePipe],
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit {
  apiUrl = environment.apiBaseUrl;
  loaderEnable:boolean = true
  userAppointments: any = [];
  appointmentValue: string = '';
  filteredAppointments: any = [];
  emptyAppointmentsMessage:string =''
  selectedType: string = 'all';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${this.apiUrl}/appointments/user`).subscribe({
      next: (res: any) => {
        this.loaderEnable= false 
        const filteredAppointments = res.data.filter((x: any) => {
          const date = new Date(x.slot_date);
          return new Date() <= date;
        });
        this.filteredAppointments = filteredAppointments;
        this.userAppointments = filteredAppointments
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('API Call completed successfully');
      }
    });
  }

  handleReturn() {
    console.log('I got clicked');
    this.router.navigate(['Patient']);
  }

  handelTypeClicked(type: string) {
    this.selectedType = type;

    const currentDate = new Date();

    if (type === 'all') {
      this.filteredAppointments = [...this.userAppointments];
    } else if (type === 'upcoming') {
      this.filteredAppointments = this.userAppointments.filter((appointment: { slot_date: string | number | Date }) =>
        new Date(appointment.slot_date) > currentDate
      );
      this.emptyAppointmentsMessage = this.filteredAppointments.length === 0 ? "You have no upcoming appointments" : "";
    } else if (type === 'completed') {
      this.filteredAppointments = this.userAppointments.filter((appointment: { slot_date: string | number | Date }) =>
        new Date(appointment.slot_date) <= currentDate
      );
      this.emptyAppointmentsMessage = this.filteredAppointments.length === 0 ?"You don't have previous appointment records":'';
    }
    console.log(this.filteredAppointments)
    // Sort by date in ascending order for a consistent display
    this.filteredAppointments.sort((a: { slot_date: string | number | Date }, b: { slot_date: string | number | Date }) =>
      new Date(a.slot_date).getTime() - new Date(b.slot_date).getTime()
    );
    console.log(this.filteredAppointments)

  }
}
