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
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-view-appointments',
  standalone: true,
  imports: [MatIcon, MatIconModule, CommonModule, TimeFormatPipe, HoursFormat12Pipe,LoaderComponent,AppointmentcardComponent,SideNavComponent,ErrorComponent],
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
  sideNavContent = [
    {route:"/Patient",image:"images/side-bar/home.png"},
    {route:"/Patient/Doctors",image:"images/side-bar/doctor.png"},
    {route:"Patient/Records",image:"images/side-bar/medical-records.png"},
    {route:"/Patient",image:"images/side-bar/info.png"},
    {route:"/Patient",image:"images/side-bar/turn-off.png"},
  ]

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${this.apiUrl}/appointments/user`).subscribe({
      next: (res: any) => {
        this.loaderEnable= false 
        const filteredAppointments = res?.data.filter((x: any) => {
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
    this.router.navigate(['Patient']);
  }
}
