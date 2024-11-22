import { Component, OnInit } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AppointmentcardComponent } from '../appointmentcard/appointmentcard.component';
import { LoaderComponent } from '../loader/loader.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ErrorComponent } from '../error/error.component';
@Component({
  selector: 'app-previous-records',
  standalone: true,
  imports: [MatCommonModule, MatIconModule, CommonModule,FormsModule,AppointmentcardComponent,LoaderComponent,SideNavComponent,ErrorComponent],
  templateUrl: './previous-records.component.html',
  styleUrls: ['./previous-records.component.css']
})
export class PreviousRecordsComponent implements OnInit {
  apiUrl = environment.apiBaseUrl;
  userAppointments: any = null;
  openLoader:boolean = true;
  sideNavContent = [
    {route:"/Patient",image:"images/side-bar/home.png"},
    {route:"/Patient/Appointments",image:"images/side-bar/book.png"},
    {route:"/Patient/Doctors",image:"images/side-bar/doctor.png"},
    {route:"/Patient/Appointments",image:"images/side-bar/info.png"},
    {route:"Patient/Records",image:"images/side-bar/turn-off.png"},
  ]
  constructor(private route: Router, private router: Router, private http: HttpClient) { }

  handleReturn() {
    this.route.navigate(['/Patient']);
  }

  ngOnInit(): void {
    this.http.get(`${this.apiUrl}/appointments/user`).subscribe({
      next: (res: any) => {
        const filteredAppointments = res.data.filter((x: any) => {
          const date = new Date(x.slot_date);
          return new Date() > date;
        });
        this.openLoader = false;
        this.userAppointments = filteredAppointments;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Previous Records Component Loaded');
      }
    });
  }
}
