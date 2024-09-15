import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { FormsModule } from '@angular/forms';
import timeGridPlugin from '@fullcalendar/timegrid'; // Corrected import
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [MatIconModule, FullCalendarModule,FormsModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  scheduleInput: string = 'doctors';
  @Output() dataFromSchedule = new EventEmitter<string>();
  apiUrl = 'http://localhost:3000';
  doctorsData: any[] = [];
  constructor(private http:HttpClient){}
  getDoctors(){
    this.http.get<any>(`${this.apiUrl}/doctors/all`).subscribe(
      (response)=>{
        console.log(response)
        this.doctorsData = response.doctorData;
        console.log(this.doctorsData)
      },(error)=>{
        console.error(`Failed to get Doctors`,error)
      }
    )
  }

  calendarOptions: any = { // Removed FullCalendarOptions type if not available
    initialView: 'timeGridDay',
    plugins: [timeGridPlugin],
    dateClick: this.handleDateClick.bind(this),
    events: [
      {
        title: 'Doctor Appointment',
        start: '2024-09-14T09:00:00',
        end: '2024-09-14T10:00:00',
        description: 'Appointment with Dr. Smith'
      },
      {
        title: 'Surgery',
        start: '2024-09-15T11:00:00',
        end: '2024-09-15T13:00:00',
        description: 'Surgery for patient John Doe'
      },
      {
        title: 'Meeting with Staff',
        start: '2024-09-16T14:00:00',
        end: '2024-09-16T15:00:00',
        description: 'Monthly staff meeting'
      },
      {
        title: 'Consultation',
        start: '2024-09-17T08:00:00',
        end: '2024-09-17T09:30:00',
        description: 'Consultation with Dr. Lee'
      }
    ]
  };

  handleDateClick(arg: any) {
    alert('Date clicked: ' + arg.dateStr);
  }

  sendToEmployee() {
    this.dataFromSchedule.emit(this.scheduleInput);
  }
}
