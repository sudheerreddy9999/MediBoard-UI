import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { response } from 'express';

@Component({
  selector: 'app-slot',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule, FullCalendarModule],
  templateUrl: './slot.component.html',
  styleUrl: './slot.component.css',
})
export class SlotComponent implements OnInit {
  @Output() dataFromSchedule = new EventEmitter<string>();
  selectedEvent: any = null;
  isModalOpen = false;
  scheduleInput: string = 'doctors';
  generateSlot: boolean = false;
  slotModal: boolean = false;
  editableEvent: any = {};
  currentDoctor: string = '';
  currentComponent = 'doctors';
  slotDetails: any = {
    doctor_id: 0,
    slot_date: '',
    slot_time: '',
    slot_end_time: '',
    available_slots: 0,
  };
  ngOnInit(): void {
    this.http.get<any>(`${this.apiUrl}/doctors/all`).subscribe({
      next: (response) => {
        console.log(response);
        this.doctorsData = response.doctorData;
        console.log(this.doctorsData);
      },
      error: (error) => {
        console.error(`Failed to get Doctors`, error);
      },
      complete: () => {
        console.log('API request completed successfully.'); // Optional: Handle completion if needed
      },
    });
  }
  sendToEmployee() {
    this.dataFromSchedule.emit(this.scheduleInput);
  }
  closeScheduleModal() {
    this.generateSlot = !this.generateSlot;
  }
  closeSlotModal() {
    this.slotModal = !this.slotModal;
  }
  apiUrl = 'http://localhost:3000';
  doctorsData: any[] = [];
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    height: 'auto', // Adjust the height of the calendar dynamically
    contentHeight: 500, // Set a fixed height for content if necessary
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [
      {
        title: 'Doctor Appointment',
        start: '2024-09-14T09:00:00',
        end: '2024-09-14T10:00:00',
        description: 'Appointment with Dr. Smith',
      },
      {
        title: 'Team Meeting',
        start: '2024-09-14T11:00:00',
        end: '2024-09-14T12:00:00',
        description: 'Discussion with the project team',
      },
      {
        title: 'Surgery',
        start: '2024-09-15T11:00:00',
        end: '2024-09-15T13:00:00',
        description: 'Surgery for patient John Doe',
      },
      {
        title: 'Meeting with Staff',
        start: '2024-09-16T14:00:00',
        end: '2024-09-16T15:00:00',
        description: 'Monthly staff meeting',
      },
      {
        title: 'Consultation',
        start: '2024-09-17T08:00:00',
        end: '2024-09-17T09:30:00',
        description: 'Consultation with Dr. Lee',
      },
      {
        title: 'Consultation',
        start: '2024-09-17T08:00:00',
        end: '2024-09-17T09:30:00',
        description: 'Consultation with Dr. Lee',
      },
    ],
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
      hour12: true, // You can change to false for 24-hour format
    },
    eventContent: function (info: any) {
  const startTime = info.event.start.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const endTime = info.event.end.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const title = info.event.title;
  const description = info.event.extendedProps.description || 'No description';

  // Check if the event is on Sunday (0 = Sunday)
  const isSunday = info.event.start.getDay() === 0;

  const tooltipPositionClass = isSunday 
    ? 'right-0 transform translate-x-full'  // For Sunday, show tooltip on the right
    : 'left-0 transform -translate-x-full'; // For other days, show tooltip on the left

  return {
    html: `
      <div class="relative p-2 bg-white dark:bg-neutral-800 border border-gray-300 rounded-lg shadow-sm cursor-pointer overflow-visible group">
        <!-- Truncated Event Title and Time -->
        <div class="flex items-center space-x-2 w-[250px]">
          <span class="text-sm text-gray-800 dark:text-gray-200">${startTime} - ${endTime}</span>
          <span class="text-sm font-medium text-gray-900 dark:text-gray-100 flex-1 truncate overflow-hidden text-ellipsis whitespace-nowrap">${title}</span>
        </div>
        <!-- Tooltip with full details -->
        <div class="absolute z-50 top-1/2 ${tooltipPositionClass} -translate-y-1/2 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:visible max-w-xs">
          <div><p class="font-medium">${title}</p></div>
          <div><span>${startTime} - ${endTime}</span></div>
          <div><span>${description}</span></div>
        </div>
      </div>
    `,
  };
},

  };
  constructor(private http: HttpClient) {}
  handleDateClick(arg: any) {
    // Change view to 'timeGridDay' and set the date to the clicked date
    this.calendarOptions = {
      ...this.calendarOptions,
      initialView: 'timeGridDay',
      initialDate: arg.dateStr, // Focus the clicked date
    };
  }
  toggleComponnet(componnet: string, docName: string, docId: number) {
    this.generateSlot = !this.generateSlot;
    if (this.generateSlot) {
      this.currentDoctor = docName;
      this.slotDetails.doctor_id = docId;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'doctor_id':this.slotDetails.doctor_id
      })
      this.http.get(`${this.apiUrl}/slots`,{ headers: headers }).subscribe({
        next:(response)=>{
          console.log(response);
        }
      }
      )
    }
  }
  openSlotModal() {
    this.slotModal = !this.slotModal;
  }
  bookSlot() {
    const body = this.slotDetails;
    let token;
    const storedData = localStorage.getItem('mediboard') || null;
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      token = parsedData.token || null;
      console.log(token); // Logs the token if it exists
    } else {
      console.log('No token found');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http
      .post(`${this.apiUrl}/slots`, body, { headers: headers })
      .subscribe({
        next: (response) => {
          console.log('Api response is', response);
        },
        error: (error) => {
          console.error('API Error:', error); // Handle the error
        },
        complete: () => {
          console.log('API request completed successfully.'); // Optional: Handle completion if needed
        },
      });
  }
  handleEventClick(arg: any) {
    this.selectedEvent = arg.event; // Store the clicked event's details
    this.editableEvent = {
      // Populate the editableEvent object
      title: this.selectedEvent.title,
      start: new Date(this.selectedEvent.start).toISOString().slice(0, 16), // Format as "yyyy-MM-ddTHH:mm"
      end: new Date(this.selectedEvent.end).toISOString().slice(0, 16),
      description: this.selectedEvent.extendedProps.description,
    };
    this.isModalOpen = true; // Open the modal
  }
  saveEvent() {
    this.selectedEvent.setProp('title', this.editableEvent.title);
    this.selectedEvent.setStart(new Date(this.editableEvent.start));
    this.selectedEvent.setEnd(new Date(this.editableEvent.end));
    this.selectedEvent.setExtendedProp(
      'description',
      this.editableEvent.description
    );
    this.isModalOpen = false; // Close the modal
  }
  closeModal() {
    this.isModalOpen = false;
  }
}
