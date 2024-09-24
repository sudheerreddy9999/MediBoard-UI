import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule, FullCalendarModule,LoaderComponent,ModalComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorComponent implements OnInit {
  @Output() dataFromSchedule = new EventEmitter<string>();
  private apiUrl:string = environment.apiBaseUrl;
  selectedEvent: any = null;
  isModalOpen = false;
  scheduleInput: string = 'doctors';
  generateSlot: boolean = false;
  currentDoctor: string = '';
  currentOpenedModal: string = '';
  currentComponent = 'doctors';
  formTitle="Add New Schedule"
  activateLoader:boolean =false;
  loaderMessage ='Loading.....'
  isErrorModal:boolean=false
  typeofModal:string ='success'
  errorModalMessage ='Error'
  formInputFeilds = {
    title: '',
    start: '',
    end: '',
    description: '',
    slot_id: '',
    slot_date:'',
    available_slots: '',
  };
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
        if (response?.doctorData) {
          this.doctorsData = response.doctorData;
          console.log('Doctors data fetched successfully:', this.doctorsData);
        } else {
          console.warn('No doctor data available in the response.');
        }
      },
      error: (error) => {
        console.error('Failed to fetch doctors:', error.message || error);
        this.activateLoader = false;
        this.isErrorModal = true
        this.errorModalMessage =error.error.message || error
        // Optional: You can show an error message to the user here
      },
      complete: () => {
        console.log('API request completed.');
      }
    });
  }
  sendToEmployee() {
    this.dataFromSchedule.emit(this.scheduleInput);
  }
  closeScheduleModal() {
    this.generateSlot = !this.generateSlot;
  }
  doctorsData: any[] = [];
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    height: 'auto',
    contentHeight: 500,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [],
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
      hour12: true,
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
      const isSunday = info.event.start.getDay() === 0;
    
      // Determine if the event is completed
      const now = new Date();
      const isCompleted = info.event.end < now;
    
      // Function to generate random colors for ongoing events
      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    
      // Set different styles and behavior for completed events
      const randomColor = getRandomColor();
      const eventClass = isCompleted ? 'bg-white text-gray-500 cursor-not-allowed' : '';
      const pointerEvents = isCompleted ? 'pointer-events-none' : 'cursor-pointer';
      const editableAttr = isCompleted ? 'pointer-events-none' : '';
      const backgroundColor = isCompleted ? 'white' : randomColor;
    
      // Ensure tooltip positioning doesn't get hidden behind other boxes
      const tooltipPositionClass = isSunday
        ? 'right-0 transform translate-x-full'
        : 'left-0 transform -translate-x-full'; 
    
      // New logic to prevent tooltip from being cut off on Sunday
      const tooltipBoundaryCheckClass = isSunday
        ? 'right-0 transform translate-x-[calc(100%+10px)]' // Pushes tooltip more to the right
        : tooltipPositionClass; // Keeps the left side positioning for other days
    
      return {
        html: `
          <div class="relative p-2 ${eventClass} border border-gray-300 rounded-lg shadow-sm cursor-pointer overflow-visible group" ${editableAttr} style="background-color: ${backgroundColor};">
            <!-- Truncated Event Title and Time -->
            <div class="flex items-center space-x-2 w-[242px]">
              <span class="text-sm text-gray-800 dark:text-gray-200">${startTime} - ${endTime}</span>
              <span class="text-sm font-medium text-gray-900 dark:text-gray-100 flex-1 truncate overflow-hidden text-ellipsis whitespace-nowrap">${title}</span>
            </div>
            <!-- Tooltip with full details -->
            <div class="absolute z-50 top-1/2 ${tooltipBoundaryCheckClass} -translate-y-1/2 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:visible max-w-xs">
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
  toggleComponnet( docName: string, docId: number) {
    this.activateLoader = true;
    this.loaderMessage=`Loading... ${docName}'s Schedule`
    console.log("heelo howare you man")
    this.generateSlot = true;
    if (this.generateSlot) {
      this.currentDoctor = docName;
      this.slotDetails.doctor_id = docId;
      this.http
        .get<any>(`${this.apiUrl}/slots/doctor`, {
          headers: {
            doctor_id: this.slotDetails.doctor_id,
          },
        })
        .subscribe({
          next: (response) => {
            this.activateLoader = false;
            this.calendarOptions.events = response.slots;
          },
          error: (error) => {
            console.error('API Error:', error); // Handle the error
            this.activateLoader = false;
            this.isErrorModal = true
            this.errorModalMessage =error.error.message || error
          },
          complete: () => {
            console.log('API request completed successfully.'); // Optional: Handle completion if needed
          },
        });
    }
  }
  openSlotModal(add: string) {
    this.currentOpenedModal = add;
    this.formTitle ="Add New Schedule"
    this.isModalOpen = !this.isModalOpen;
    // this.http.post(`${this.apiUrl}/`)
  }
  handleEventClick(arg: any) {
    this.formTitle ="Edit Schedule"

    console.log(arg.event);
    this.selectedEvent = arg.event;
    console.log(this.selectedEvent.start, "date is file");
  
    // Helper function to format date as 'HH:MM'
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };
  
    // Assuming this.selectedEvent.start and this.selectedEvent.end are date strings or Date objects
    const startDate = new Date(this.selectedEvent.start);
    const endDate = new Date(this.selectedEvent.end);
  
    // Format the start and end times
    const startTimeString = formatTime(startDate);
    const endTimeString = formatTime(endDate);
  
    // Format the date as 'YYYY-MM-DD' for the slot_date
    const slotDateString = startDate.toISOString().slice(0, 10);
  
    // Update formInputFeilds with formatted values
    this.formInputFeilds = {
      title: this.selectedEvent.title,
      start: startTimeString,
      end: endTimeString,
      description: this.selectedEvent.extendedProps.description,
      slot_id: this.selectedEvent.extendedProps.slot_id,
      slot_date: slotDateString,
      available_slots: this.selectedEvent.extendedProps.available_slots,
    };
  
    console.log(this.formInputFeilds, "values are");
    this.isModalOpen = true; // Open the modal
  }  
  saveEvent() {
    console.log(this.formInputFeilds,"Helellelk")
    this.activateLoader = true;
    const body = {
      doctor_id: this.slotDetails.doctor_id || null,
      slot_id: this.formInputFeilds.slot_id || null,
      available_slots: this.formInputFeilds.available_slots,
      slot_date: this.formInputFeilds.slot_date,
      slot_time: this.formInputFeilds.start,
      slot_end_time: this.formInputFeilds.end,
      title: this.formInputFeilds.title,
      description: this.formInputFeilds.description,
    };
    console.log(body,"Boday nananan")
    if (body.slot_id) {
      this.http.put(`${this.apiUrl}/slots`, body).subscribe({
        next: (response) => {
          console.log('Event updated successfully:', response);
          this.formInputFeilds = {
            title: '',
            start: '',
            end: '',
            description: '',
            slot_id: '',
            slot_date:'',
            available_slots: '',
          };
          this.toggleComponnet(this.currentDoctor, this.slotDetails.doctor_id)
          this.activateLoader = false;
        },
        error: (error) => {  
          console.error('Error updating event:', error);
          console.log(error.error.message)
          this.isErrorModal = true
          this.activateLoader = false;
          this.errorModalMessage =error.error.message || error
        },
        complete: () => {
          console.log('Event update completed.');
        },
      });
    } else {
      this.http.post(`${this.apiUrl}/slots`, body).subscribe({
        next: (response) => {
          console.log('Event updated successfully:', response);
          this.formInputFeilds = {
            title: '',
            start: '',
            end: '',
            description: '',
            slot_id: '',
            slot_date:'',
            available_slots: '',
          };
          this.toggleComponnet(this.currentDoctor, this.slotDetails.doctor_id)
          this.activateLoader = false;
        },
        error: (error) => {
          console.error('Error updating event:', error);
          this.activateLoader = false;
          this.isErrorModal = true
          this.errorModalMessage =error.error.message || error
        },
        complete: () => {
          console.log('Event update completed.');
        },
      });
    }
    this.isModalOpen = false; // Close the modal
  }
  closeModal() {
    this.isModalOpen = false;
  }
}
